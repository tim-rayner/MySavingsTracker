import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type UserState = {
  hasFinishedOnboarding: boolean;
  onboardingPageIndex: number;
  toggleHasOnboarded: () => void;
  onboardingPageNext: (length: number) => void;
  onboardingPagePrev: () => void;
};

export const useUserStore = create(
  persist<UserState>(
    (set, get) => ({
      hasFinishedOnboarding: false,
      onboardingPageIndex: 0,
      toggleHasOnboarded: () => {
        return set((state) => {
          return {
            ...state,
            hasFinishedOnboarding: !state.hasFinishedOnboarding,
            onboardingPageIndex: 0,
          };
        });
      },

      onboardingPageNext: (length: number) => {
        const state = get();
        if (state.onboardingPageIndex < length - 1) {
          return;
        }
        set((state) => {
          return {
            ...state,
            onboardingPageIndex: state.onboardingPageIndex + 1,
          };
        });
      },
      onboardingPagePrev: () => {
        const state = get();
        if (state.onboardingPageIndex <= 0) {
          return;
        }
        set((state) => {
          return {
            ...state,
            onboardingPageIndex: state.onboardingPageIndex - 1,
          };
        });
      },
    }),
    {
      name: "mst-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
