import React, { useState, useMemo } from 'react';
import { InputState } from './types';
import PerceptronDiagram from './components/PerceptronDiagram';
import { PlusIcon, MinusIcon, BrainCircuitIcon } from './components/icons';

let nextId = 0;
const generateId = () => `id-${nextId++}`;

const App: React.FC = () => {
  const [inputs, setInputs] = useState<InputState[]>([
    { id: generateId(), value: 1, weight: 0.5 },
    { id: generateId(), value: 0, weight: -0.5 },
  ]);
  const [bias, setBias] = useState<number>(-0.2);

  const handleInputChange = (id: string, field: 'value' | 'weight', newValue: number) => {
    setInputs(inputs.map(input => 
      input.id === id ? { ...input, [field]: newValue } : input
    ));
  };

  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { id: generateId(), value: 0, weight: 0.1 }]);
    }
  };

  const removeInput = () => {
    if (inputs.length > 1) {
      setInputs(inputs.slice(0, -1));
    }
  };

  const { sum, output } = useMemo(() => {
    const calculatedSum = inputs.reduce((acc, input) => acc + input.value * input.weight, 0) + bias;
    // Step activation function
    const calculatedOutput = calculatedSum > 0 ? 1 : 0;
    return { sum: calculatedSum, output: calculatedOutput };
  }, [inputs, bias]);

  const buttonStyle: React.CSSProperties = {
      flex: 1, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '0.5rem', 
      color: 'white', 
      fontWeight: 'bold', 
      padding: '0.5rem 1rem', 
      borderRadius: '0.25rem', 
      border: 'none', 
      cursor: 'pointer',
      transition: 'background-color 0.2s ease-in-out',
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#111827', color: 'white', fontFamily: 'sans-serif', padding: '1rem'}}>
      <style>{`
        body { margin: 0; }
        .range-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 5px;
          background: #374151;
          outline: none;
          opacity: 0.7;
          transition: opacity .2s;
        }
        .range-slider:hover {
          opacity: 1;
        }
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
        }
        .range-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #6366f1;
          cursor: pointer;
        }
        .main-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        @media (min-width: 1024px) {
            .main-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
        .button-add { background-color: #4f46e5; }
        .button-add:hover:not(:disabled) { background-color: #4338ca; }
        .button-add:disabled { background-color: #4b5563; cursor: not-allowed; }
        .button-remove { background-color: #db2777; }
        .button-remove:hover:not(:disabled) { background-color: #be185d; }
        .button-remove:disabled { background-color: #4b5563; cursor: not-allowed; }
      `}</style>
      <main style={{maxWidth: '1280px', margin: '0 auto'}}>
        <header style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
            <BrainCircuitIcon style={{width: '3rem', height: '3rem', color: '#818cf8'}} />
            <h1 style={{fontSize: '2.25rem', fontWeight: 'bold', background: 'linear-gradient(to right, #818cf8, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Perceptron Simulator
            </h1>
          </div>
          <p style={{marginTop: '1rem', fontSize: '1.125rem', color: '#9ca3af', maxWidth: '42rem', margin: '1rem auto 0'}}>
            An interactive tool to visualize the inner workings of a single perceptron, the fundamental building block of neural networks.
          </p>
        </header>

        <div className="main-grid">
          <div style={{backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)'}}>
            <h2 style={{fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: '#a5b4fc'}}>Controls</h2>
            
            <div style={{marginBottom: '1.5rem'}}>
              <h3 style={{fontSize: '1.125rem', fontWeight: 500, color: '#d1d5db', marginBottom: '1rem'}}>Inputs & Weights</h3>
              {inputs.map((input, index) => (
                <div key={input.id} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '0.75rem', backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '0.375rem', marginBottom: '1rem'}}>
                  <div>
                    <label style={{fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.25rem', display: 'block'}}>Input (x{index + 1})</label>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="1"
                        value={input.value}
                        onChange={(e) => handleInputChange(input.id, 'value', Number(e.target.value))}
                        className="range-slider"
                      />
                      <span style={{fontFamily: 'monospace', color: '#a5b4fc', width: '2rem', textAlign: 'center'}}>{input.value}</span>
                    </div>
                  </div>
                   <div>
                    <label style={{fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.25rem', display: 'block'}}>Weight (w{index + 1})</label>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                       <input 
                        type="range" 
                        min="-1" 
                        max="1" 
                        step="0.01"
                        value={input.weight}
                        onChange={(e) => handleInputChange(input.id, 'weight', Number(e.target.value))}
                        className="range-slider"
                      />
                      <span style={{fontFamily: 'monospace', color: '#a5b4fc', width: '4rem', textAlign: 'center'}}>{input.weight.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem'}}>
                <button onClick={addInput} disabled={inputs.length >= 5} className="button-add" style={buttonStyle}>
                    <PlusIcon style={{width: '1.25rem', height: '1.25rem'}} /> Add Input
                </button>
                <button onClick={removeInput} disabled={inputs.length <= 1} className="button-remove" style={buttonStyle}>
                    <MinusIcon style={{width: '1.25rem', height: '1.25rem'}} /> Remove Input
                </button>
            </div>

            <div>
              <h3 style={{fontSize: '1.125rem', fontWeight: 500, color: '#d1d5db', marginBottom: '0.5rem'}}>Bias</h3>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: 'rgba(55, 65, 81, 0.5)', borderRadius: '0.375rem'}}>
                <input 
                  type="range" 
                  min="-1" 
                  max="1" 
                  step="0.01"
                  value={bias}
                  onChange={(e) => setBias(Number(e.target.value))}
                  className="range-slider"
                />
                <span style={{fontFamily: 'monospace', color: '#a5b4fc', width: '4rem', textAlign: 'center'}}>{bias.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <PerceptronDiagram inputs={inputs} bias={bias} sum={sum} output={output} />
             <div style={{marginTop: '1.5rem', backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.5rem', textAlign: 'center', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)'}}>
                <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: '#a5b4fc'}}>Calculation</h3>
                <p style={{fontSize: '1.125rem', fontFamily: 'monospace', color: '#d1d5db', wordBreak: 'break-word'}}>
                    {inputs.map((i) => `(${i.value}*${i.weight.toFixed(2)})`).join(' + ')} + ({bias.toFixed(2)}) = <span style={{color: '#4ade80', fontWeight: 'bold'}}>{sum.toFixed(2)}</span>
                </p>
                <p style={{marginTop: '0.5rem', fontSize: '1.125rem', color: '#d1d5db'}}>
                    Output = Step({sum.toFixed(2)}) = <span style={{color: '#facc15', fontWeight: 'bold'}}>{output}</span>
                </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
