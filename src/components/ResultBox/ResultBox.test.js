import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
const testCasesPLN = [
  { amount: '100', expected: 'PLN 100.00 = $28.57' },
  { amount: '20', expected: 'PLN 20.00 = $5.71' },
  { amount: '200', expected: 'PLN 200.00 = $57.14' },
  { amount: '345', expected: 'PLN 345.00 = $98.57' },
];

const testCasesUSD = [
  { amount: '100', expected: '$100.00 = PLN 350.00' },
  { amount: '20', expected: '$20.00 = PLN 70.00' },
  { amount: '200', expected: '$200.00 = PLN 700.00' },
  { amount: '345', expected: '$345.00 = PLN 1,207.50' },
];

const testCases = [
  { amount: '100', from: 'PLN', to: 'PLN', expected: 'PLN 100.00 = PLN 100.00' },
  { amount: '65', from: 'PLN', to: 'PLN', expected: 'PLN 65.00 = PLN 65.00' },
  { amount: '200', from: 'USD', to: 'USD', expected: '$200.00 = $200.00' },
  { amount: '345', from: 'USD', to: 'USD', expected: '$345.00 = $345.00' },
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {  
    for(const testObj of testCasesPLN) {
      render(<ResultBox from="PLN" to="USD" amount={parseInt(testObj.amount)} />);
      const output = screen.getByTestId('amount-output');
      expect(output).toHaveTextContent(testObj.expected);
      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> PLN', () => {  
    for(const testObj of testCasesUSD) {
      render(<ResultBox from="USD" to="PLN" amount={parseInt(testObj.amount)} />);
      const output = screen.getByTestId('amount-output');
      expect(output).toHaveTextContent(testObj.expected);
      cleanup();
    }
  });

  it('should render proper info about conversion when PLN -> PLN or USD -> USD', () => {  
    for(const testObj of testCases) {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
      const output = screen.getByTestId('amount-output');
      expect(output).toHaveTextContent(testObj.expected);
      cleanup();
    }
  });
  it('should render "Wrong value..." when value is < 0', () => {  
    render(<ResultBox from='USD' to='PLN' amount={-1} />);
    const output = screen.getByTestId('wrong-output');
    expect(output).toHaveTextContent('Wrong value...');
    cleanup();
   });

});