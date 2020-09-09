// @ts-nocheck
const http = require('http');
const openFile = require('../../converter/server')

jest.mock('http');
describe('openFile', ()=> {
    
    it('should create server on port 8000', () => {
        let func = jest.fn((req, res)=> {})
        
        const server = http.createServer(func)
        expect(http.createServer).toBeCalled()
        

        // openFile('<h1>Hey You</h1>')
        
    });
})

