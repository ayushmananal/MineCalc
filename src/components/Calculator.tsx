import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const allClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (!waitingForOperand) {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay === '' ? '0' : newDisplay);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-background p-6 rounded-none border-4 border-foreground font-pixel">
      {/* Display */}
      <div 
        className="w-full h-20 bg-secondary border-4 border-foreground mb-6 flex items-center justify-end px-4 text-2xl text-foreground overflow-hidden"
        style={{ boxShadow: 'inset 4px 4px 0px hsl(var(--foreground))' }}
      >
        {display}
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button
          variant="pixel"
          className="col-span-2"
          onClick={allClear}
        >
          AC
        </Button>
        <Button
          variant="pixel"
          onClick={backspace}
        >
          ←
        </Button>
        <Button
          variant="pixel"
          onClick={() => inputOperation('/')}
        >
          ÷
        </Button>

        {/* Row 2 */}
        <Button
          variant="pixel"
          onClick={() => inputNumber('7')}
        >
          7
        </Button>
        <Button
          variant="pixel"
          onClick={() => inputNumber('8')}
        >
          8
        </Button>
        <Button
          variant="pixel"
          onClick={() => inputNumber('9')}
        >
          9
        </Button>
        <Button
          variant="pixel"
          onClick={() => inputOperation('*')}
        >
          ×
        </Button>

        {/* Row 3 */}
        <Button
          variant="pixel"
          onClick={() => inputNumber('4')}
        >
          4
        </Button>
        <Button
          variant="pixel"
          onClick={() => inputNumber('5')}
        >
          5
        </Button>
        <Button
          variant="pixel"
          onClick={() => inputNumber('6')}
        >
          6
        </Button>
        <Button
          variant="pixel"
          onClick={() => inputOperation('-')}
        >
          -
        </Button>

        {/* Row 4 */}
        <Button
          variant="pixel"
          onClick={() => inputNumber('1')}
        >
          1
        </Button>
        <Button
          variant="pixel"
          onClick={() => inputNumber('2')}
        >
          2
        </Button>
        <Button
          variant="pixel"
          onClick={() => inputNumber('3')}
        >
          3
        </Button>
        <Button
          variant="pixel"
          onClick={() => inputOperation('+')}
          className="row-span-2"
        >
          +
        </Button>

        {/* Row 5 */}
        <Button
          variant="pixel"
          className="col-span-2"
          onClick={() => inputNumber('0')}
        >
          0
        </Button>
        <Button
          variant="pixel"
          onClick={inputDecimal}
        >
          .
        </Button>
        <Button
          variant="pixel"
          onClick={performCalculation}
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default Calculator;