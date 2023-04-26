import { describe, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useTokenAuth from "@/hooks/useTokenAuth";

let fakeLocalStorage = {};

const storagePrototype = {
  getItem: function (key: string) {
    return localStorageMock[key] || null;
  },
  setItem: function (key: string, value: string) {
    localStorageMock[key] = value.toString();
  },
  removeItem: function (key: string) {
    delete localStorageMock[key];
  },
  clear: function () {
    Object.keys(fakeLocalStorage).forEach(
      (key) => delete localStorageMock[key]
    );
  },
};

export const localStorageMock = Object.create(storagePrototype);

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const mockDispatch = vi.fn();
const getUserFunc = vi.fn();

vi.mock("react-redux", async () => {
  const actual: any = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

vi.mock("../services/user/useGetUser", async () => {
  const actual: any = await vi.importActual("../services/user/useGetUser");
  return {
    ...actual,
    default: () => ({
      getUser: getUserFunc,
      loading: false,
      data: {
        getUserById: {
          username: "Vv",
        },
      },
    }),
  };
});

vi.mock("../app/hooks", async () => {
  const actual: any = await vi.importActual("../app/hooks");
  return {
    ...actual,
    useAppSelector: vi.fn().mockReturnValue({
      user: {
        username: "Vv",
      },
    }),
  };
});

describe("Router", () => {
  it("Renders Router Hook", () => {
    storagePrototype.setItem("token", import.meta.env.VITE_TOKEN_TEST);
    const { result } = renderHook(() => useTokenAuth());

    expect(result.current.userState).toEqual({
      user: {
        username: "Vv",
      },
    });
  });
});
