import React from 'react';

// Define a local type for props to ensure this component works with numbers
interface DiagramInput {
  id: string;
  value: number;
  weight: number;
}

interface PerceptronDiagramProps {
  inputs: DiagramInput[];
  bias: number;
  sum: number;
  output: number;
}

const PerceptronDiagram: React.FC<PerceptronDiagramProps> = ({ inputs, bias, sum, output }) => {
  const numInputs = inputs.length;
  const diagramHeight = Math.max(250, numInputs * 80);
  const neuronX = 350;
  const inputX = 50;
  const neuronY = diagramHeight / 2;
  const outputX = 450;

  const inputSpacing = diagramHeight / (numInputs + 1);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', backgroundColor: '#111827', borderRadius: '0.5rem' }}>
      <svg width="500" height={diagramHeight} style={{ overflow: 'visible' }}>
        {/* Inputs and Weights */}
        {inputs.map((input, index) => {
          const inputY = inputSpacing * (index + 1);
          const midY = (inputY + neuronY) / 2;
          return (
            <g key={input.id}>
              {/* Input node */}
              <circle cx={inputX} cy={inputY} r="15" fill="#6366f1" />
              <text x={inputX} y={inputY} dy="0.35em" textAnchor="middle" fill="white" style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                {input.value}
              </text>
              <text x={inputX} y={inputY - 25} textAnchor="middle" fill="#9ca3af" style={{ fontSize: '0.75rem' }}>
                Input {index + 1}
              </text>

              {/* Connection line */}
              <line x1={inputX} y1={inputY} x2={neuronX} y2={neuronY} stroke="#4b5563" strokeWidth="2" />
              
              {/* Weight */}
              <text x={(inputX + neuronX) / 2} y={midY - 10} textAnchor="middle" fill="#a5b4fc" style={{ fontSize: '0.875rem' }}>
                w{index + 1}: {input.weight.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* Bias */}
        <g>
          <text x={neuronX - 70} y={neuronY + 60} textAnchor="middle" fill="#a5b4fc" style={{ fontSize: '0.875rem' }}>
            Bias: {bias.toFixed(2)}
          </text>
        </g>

        {/* Neuron */}
        <g>
          <circle cx={neuronX} cy={neuronY} r="40" fill="#4338ca" stroke="#818cf8" strokeWidth="2" />
          <text x={neuronX} y={neuronY - 12} textAnchor="middle" fill="white" style={{ fontWeight: 600, fontSize: '0.75rem' }}>
            SUM
          </text>
          <text x={neuronX} y={neuronY + 12} textAnchor="middle" fill="white" style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
            {sum.toFixed(2)}
          </text>
          <text x={neuronX} y={neuronY + 55} textAnchor="middle" fill="#9ca3af" style={{ fontSize: '0.75rem' }}>
            Activation: Step
          </text>
        </g>

        {/* Output */}
        <g>
          <line x1={neuronX} y1={neuronY} x2={outputX} y2={neuronY} stroke="#818cf8" strokeWidth="2" />
          <circle cx={outputX} cy={neuronY} r="15" fill="#6366f1" />
          <text x={outputX} y={neuronY} dy="0.35em" textAnchor="middle" fill="white" style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
            {output}
          </text>
          <text x={outputX} y={neuronY - 25} textAnchor="middle" fill="#9ca3af" style={{ fontSize: '0.75rem' }}>
            Output
          </text>
        </g>
      </svg>
    </div>
  );
};

export default PerceptronDiagram;