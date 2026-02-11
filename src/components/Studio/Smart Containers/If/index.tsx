type Operators = '==' | '>' | '<' | '>=' | '<=' | 'contains';

interface IfBlockProps {
  operand: any;
  value: any;
  operator: Operators;
  negate: boolean;
  children?: any;
}

function isConditionMet(props: IfBlockProps) {
  const { operand, value, operator, negate } = props;
  switch(operator) {
    case '==':
      return Array.isArray(operand) ? operand.length == value : operand === value;
    case '>':
      return Array.isArray(operand) ? operand.length > value : operand > value;
    case '<':
      return Array.isArray(operand) ? operand.length < value : operand < value;
    case '>=':
      return Array.isArray(operand) ? operand.length >= value : operand >= value;
    case '<=':
      return Array.isArray(operand) ? operand.length <= value : operand <= value;
    case 'contains':
      return Array.isArray(operand) ? operand.some((item) => item.includes(value)) : operand.includes(value);
    default:
      return false;
  }
}

export default function If(props: IfBlockProps) {
  const { negate, children } = props;
  const isSatisfied = negate ? !isConditionMet(props) : isConditionMet(props);
  
  if(!isSatisfied) {
    return null;
  }
  return children;
}