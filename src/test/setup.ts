import "@testing-library/jest-dom";
import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(Element.prototype, "scrollIntoView", {
  writable: true,
  value: vi.fn(),
});

Object.defineProperty(window, "requestAnimationFrame", {
  writable: true,
  value: (callback: FrameRequestCallback) => window.setTimeout(() => callback(performance.now()), 16),
});

Object.defineProperty(window, "cancelAnimationFrame", {
  writable: true,
  value: (id: number) => window.clearTimeout(id),
});

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

HTMLCanvasElement.prototype.getContext = vi.fn(() => {
  return {
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    arc: vi.fn(),
    createRadialGradient: vi.fn(() => ({
      addColorStop: vi.fn(),
    })),
    set strokeStyle(_value: string) {},
    set lineWidth(_value: number) {},
    set fillStyle(_value: string | CanvasGradient | CanvasPattern) {},
  } as unknown as CanvasRenderingContext2D;
});

const svgPathPrototype = (window.SVGPathElement?.prototype ?? window.SVGElement.prototype) as SVGElement;

Object.defineProperty(svgPathPrototype, "getTotalLength", {
  writable: true,
  value: vi.fn(() => 300),
});

Object.defineProperty(svgPathPrototype, "getPointAtLength", {
  writable: true,
  value: vi.fn((length: number) => ({
    x: 18 + length / 5,
    y: 70 - length / 20,
  })),
});
