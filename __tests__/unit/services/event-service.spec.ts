import { EventService } from '../../../packages/g-lite/src/services/EventService';

describe('EventService', () => {
  it('uses parent element sizing when DOM element is SVG', () => {
    const parent = document.createElement('div');
    Object.defineProperty(parent, 'offsetWidth', { value: 100 });
    Object.defineProperty(parent, 'offsetHeight', { value: 50 });
    const bbox = {
      width: 200,
      height: 100,
      left: 0,
      top: 0,
    } as DOMRect;
    parent.getBoundingClientRect = jest.fn().mockReturnValue(bbox);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    parent.appendChild(svg);

    const context = {
      contextService: {
        getBoundingClientRect: jest.fn().mockReturnValue(bbox),
        getDomElement: jest.fn().mockReturnValue(svg),
      },
      config: {},
    };

    const eventService = new EventService({} as any, context as any);

    const point = eventService.client2Viewport({ x: 200, y: 100 });

    expect(point.x).toBe(100);
    expect(point.y).toBe(50);
    expect(parent.getBoundingClientRect).toBeCalled();
  });
});
