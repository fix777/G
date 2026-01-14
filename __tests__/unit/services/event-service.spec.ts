import { EventService } from '../../../packages/g-lite/src/services/EventService';

describe('EventService', () => {
  it('calculates scale using parent SVG element when available', () => {
    const parent = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    parent.setAttribute('width', '100');
    parent.setAttribute('height', '50');

    const child = document.createElement('canvas');
    parent.appendChild(child);

    const bbox = {
      width: 200,
      height: 100,
      left: 0,
      top: 0,
    } as DOMRect;

    const context = {
      contextService: {
        getBoundingClientRect: jest.fn().mockReturnValue(bbox),
        getDomElement: jest.fn().mockReturnValue(child),
      },
      config: {},
    };

    const eventService = new EventService({} as any, context as any);

    const point = eventService.client2Viewport({ x: 200, y: 100 });

    expect(point.x).toBe(100);
    expect(point.y).toBe(50);
  });
});
