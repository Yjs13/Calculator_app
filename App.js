// Extra function that I have implemented to the calculator app
// Change the C button to AC whenever relevant (I mimic how the ios calculator app functions)
// When AC button is pressed, it would resets the value and memory and clears all the calculator memory
// When C button is pressed, it would reset the user current input and set the button back to AC

// Add indicators to the calculator to reflect the current operator stored

// Update the calculator to become a scientific calculator (e.g. it shows the mathematical equation when calculating - 5+5=10)
// When the '=' button is hit, the mathematical equation will be updated with the result
// this ensures that the mathematical equation does not get excessively long with the ongoing calculation

// I implemented extra function that accepts '.' into the calculation

// I customize an extra text column that stores the calculation result 
// So, the display result filed will have two text column
// One is for the user answerValue which stores which button was pressed by the user
// Another column is for the calculated result (it would only appears after the '=' button is pressed)

// I implemented a function that only allows the calculator to accepts a certain amount of inputs
// so that the inputs would not overload
// it will fits in the calculator display input 

// I implemented addition styling to the calculator app which is the font, fontSize, backgroundColor and color of the calculator.

import { StatusBar } from 'expo-status-bar';
import {useState, useCallback} from 'react';
import { Text, View , TouchableOpacity, SafeAreaView} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {styles} from './assets/styles';

SplashScreen.preventAutoHideAsync();

export default function App() {

  // display field on the calculator to show user what button they have pressed
  const[pressedValue, setPressedValue] = useState('');
  // result field to use for calculation, it received its value when the user pressed the button
  const[answerValue, setAnswerValue] = useState(0);
  // total end value to display on the calculator
  const[resultValue, setResultValue] = useState('');
  // determines whether we should replace what is on the display field the next time a number is pressed
  const[readyToReplace, setReadyToReplace] = useState(true);
  // to save the previous pressed button value for calculation
  const[memoryValue, setMemoryValue] = useState('');
  // to save +,-,x,/ operator pressed by the user
  const[operatorValue, setOperatorValue] = useState(0);
  // to save the state of the clear button whether it is AC or C
  const[clearValue, setClearValue] = useState('AC');
  // detect whether the equal button was pressed
  const[equalState, setEqualState] = useState(false);

  // retrieve from open source google font website
  const [isLoaded] = useFonts({
    "Sn-mid": require("./assets/fonts/SignikaNegative-Medium.ttf"),
  });

  // hide after font have loaded
  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      //hide the splashscreen
      await SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  // handle all button pressed
  function buttonPressed(value)
  {
    const pressedValueLength = pressedValue.length
    // display on the calculator to show user what they have pressed
    if(value !== 'C' && value !== 'AC' && value !== '=' && pressedValueLength < 30)
    {
      setPressedValue(handleDisplayNumber(value));
      // when value was pressed set the 'AC' button to 'C'
      setClearValue('C');
    }

    // to set value to enable calculation
    // if the pressed value is a number or '.' and not an operator
    if ((!isNaN(value) || value === '.') && (pressedValueLength < 30))
    {
      setAnswerValue(handleNumber(value));
    }
    
    if(value === 'AC')
    {
      // resets the value and memory
      // clears all the calculator memory
      setAnswerValue(0);
      setMemoryValue(0);
      setOperatorValue(0);
      setPressedValue('');
      setResultValue('');
      setReadyToReplace(true);
      setEqualState(false);
    }

    if(value === 'C' )
    {
      // clears the current user's input
      setPressedValue('');
      // reset the button to 'AC'
      setClearValue('AC');
      if(resultValue !== '')
      {
        setAnswerValue(resultValue);
        setMemoryValue(answerValue);
        setOperatorValue(0);
      }
      else
      {
        setAnswerValue(memoryValue);
      }
    }
    
    // detects if the button value is an operator
    if((value === '+' || value === '-' || value === 'x' || value === '/') && (answerValue.toString().length < 29))
    {
      // when equal value was pressed
      if(equalState === true)
      {
        // it push the result value to the pressedValue so that it shows futher calculation equation
        // ex: resultValue = 10
        // pressedValue shows 10 + (eg:+) when an operator was pressed if the user have pressed the equal button
        setPressedValue(resultValue + value);
        setEqualState(false);
      }
      if(operatorValue !== 0)
      {
        // for chain calculation
        const chainValue = calculateEquals();
        setMemoryValue(chainValue);
      }
      else
      {
        setMemoryValue(answerValue);
      }
      setReadyToReplace(true);
      // detects operator value
      setOperatorValue(value);
    }
    
    // detect the equal button pressed
    // checks whether the inputs is less than 30 
    if (value === '=' && (answerValue.toString().length < 30))
    {
      setAnswerValue(calculateEquals());
      setMemoryValue(answerValue);
      setResultValue(calculateEquals());
      setOperatorValue(0);
      setReadyToReplace(true);
      setEqualState(true);
    }

    // detects the '+/-' button pressed
    // change the value to negative and positive
    if (value === '+/-')
    {
      const plusMinus = answerValue * -1;
      setAnswerValue(plusMinus);
      if(operatorValue === 0)
      {
        setPressedValue(plusMinus);
      }
      else
      {
        setResultValue(plusMinus);
      }
    }

    // detects the '%' button pressed
    if(value === '%' )
    {
      const pec = answerValue*0.01
      setAnswerValue(pec);
      setResultValue(pec);
    }
  }

  //handleDisplayNumber() enables the calculator to display the calculate equation
  // it would also return the operator value
  // ex: 10 + 3
  // handleNumber() is used for calculation where it just returns the number that the user has pressed
  // it does not return the operator value
  // it just handles when the button pressed is a number

  // display number on the calculator
  function handleDisplayNumber(value)
  {
    if(answerValue === 0)
    {
      return value;
    }
    else
    {
      return pressedValue + value;
    }
  }

  // to insert into the answerValue
  // for calculation 
  function handleNumber(value)
  {
    if(readyToReplace === true)
    {
      setReadyToReplace(false);
      return value;
    }
    else 
    {
      return answerValue + value;
    }
  }

  // calculate value based on the operator
  function calculateEquals()
  {
    const previous = parseFloat(memoryValue);
    const current = parseFloat(answerValue);

    switch(operatorValue)
    {
      case "+":
        return previous + current;
      case "-":
        return previous - current;
      case "x":
        return previous * current;
      case "/":
        return previous / current;
      case "%":
        return previous % current;
      default:
        return answerValue;
    }
  }

  return (
    <SafeAreaView style={styles.container} onLayout={handleOnLayout}>
      <View style={styles.container}>
        {/* Results field */}
        <View style={styles.displayContainer}>
          <Text style={styles.displayPressedValue}>{pressedValue}</Text>
          <Text style={styles.displayResultValue}>{resultValue}</Text>
        </View>
        {/*button first row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttonRow1} onPress={() => buttonPressed(clearValue)}>
            <Text style={styles.buttonText}>{clearValue}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRow1} onPress={() => buttonPressed('+/-')}>
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRow1} onPress={() => buttonPressed('%')}>
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonRow1, styles.coralColor]} onPress={() => buttonPressed('/')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>/</Text>
          </TouchableOpacity>
        </View>
        {/* button second row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed('7')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed('8')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed('9')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.coralColor]} onPress={() => buttonPressed('x')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>x</Text>
          </TouchableOpacity>
        </View>
        {/* button third row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed('4')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed('5')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed('6')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.coralColor]} onPress={() => buttonPressed('-')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>-</Text>
          </TouchableOpacity>
        </View>
        {/* button forth row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed('1')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed('2')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed('3')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.coralColor]} onPress={() => buttonPressed('+')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>+</Text>
          </TouchableOpacity>
        </View>
        {/* Last row */}
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.buttonZero]} onPress={() => buttonPressed('0')}>
            <Text style={[styles.buttonText, styles.buttonZeroText]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed('.')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.coralColor]} onPress={() => buttonPressed('=')}>
            <Text style={[styles.buttonText, styles.whiteColor]}>=</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style='light' />
      </View>
    </SafeAreaView>
  );
}