// @ts-nocheck
const Format = require('../converter/format');
const Convert = require('../converter/svgconverter');
jest.mock('../converter/format');
jest.mock('../converter/svgconverter');

    let string = '<svg>My svg</svg>'

    const mockFindAndReplace = jest.fn()
    Convert.mockImplementation(() => {
        return {
            findAndReplace: mockFindAndReplace
        }
    });

    beforeEach(() => {
        Convert.mockClear()
        mockFindAndReplace.mockClear()
    })

    it('The consumer shuld be able to call new() on Convert', ()=>{
        const convert = new Convert(string)
        expect(convert).toBeTruthy()
    })