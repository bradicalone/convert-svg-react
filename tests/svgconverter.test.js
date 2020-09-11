// @ts-nocheck
const Format = require('../converter/format');
const Convert = require('../converter/svgconverter');
jest.mock('../converter/format');
jest.mock('../converter/svgconverter');

    let string = '<svg>My svg</svg>'

    const mockFindAndReplace = jest.fn(() => 'Function within')
    Convert.mockImplementation(() => {
        return {
            findAndReplace: mockFindAndReplace
        }
    });

    beforeEach(() => {
        Convert.mockClear()
        mockFindAndReplace.mockClear()
    })

    it('The consumer should be able to call new() on Convert and return string', ()=>{
        const convert = new Convert(string).findAndReplace()
        expect(convert).toBeTruthy()
    })

    it('Convert has been called', () =>{
        const convert = new Convert(string).findAndReplace()
        expect(Convert).toHaveBeenCalled()
    })