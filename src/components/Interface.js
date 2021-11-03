import React from 'react'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { FaEquals } from 'react-icons/fa';
import Data from '../data.json';

const options = Data.map(element => {
	return {value: element, label: element.toUpperCase()}
})

const Interface = () => {

	const getConversionRates = async (fromCurrency, toCurrency) => {
		const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurrency}/${toCurrency}.json`)
		const data = await response.json();
		return data;
	}

	const [ inAmount, setInAmount] = useState(1);
	const [ outAmount, setOutAmount ] = useState(1);
	const [ inputCurrency, setInputCurrency ] = useState('usd')
	const [ outputCurrency, setOutputCurrency ] = useState('usd')

	const handleNewAmount = (event) => {
		setInAmount(event.target.value);
	}
	const handleConversionRate = (event) => {
		setOutAmount(event.target.value);
	}
	const handleNewInputCurrency = (event) => {
		setInputCurrency(event.value)
	}
	const handleNewOutputCurrency = (event) => {
		setOutputCurrency(event.value);
	}

	useEffect(() => {
		const getData = async (fromCurrency, toCurrency, inputAmount) => {
			const res = await getConversionRates(fromCurrency, toCurrency);
			setOutAmount((res[toCurrency] * inputAmount).toFixed(2))
		}

		getData(inputCurrency, outputCurrency, inAmount);
	}, [inputCurrency, outputCurrency, inAmount])

	return (
		<>
			<CurrencyGroup
				id="form-1"
				value={inAmount}
				handleAmountChange={handleNewAmount}
				handleCurrencyChange={handleNewInputCurrency}
				inputDisabled={false}
			/>
			<FaEquals size={60} id="equals-icon" />
			<CurrencyGroup
				id="form-2"
				value={outAmount}
				handleAmountChange={handleConversionRate}
				handleCurrencyChange={handleNewOutputCurrency}
				inputDisabled={true}
			/>
		</>
	)
};

const CurrencyGroup = (props) => {

	const customStyles = {

	  option: (provided, state) => ({
	    ...provided,
	    borderBottom: '1px dotted #282c34',
	    color: state.isSelected ? 'white' : state.isFocused ? 'white' : '#282c34',
	    backgroundColor: state.isSelected ? '#282c34' : state.isFocused ? '#6b7382' : 'white',
	    padding: 15,
	  }),

	  control: (provided) => ({
			...provided,
	    width: 160,
			border: '1px solid #282c34',
			borderTop: '1px dotted #282c34',
			borderTopRightRadius: 0,
			borderTopLeftRadius: 0,
	  }),

	  singleValue: (provided, state) => {
	    const opacity = state.isDisabled ? 0.5 : 1;
	    const transition = 'opacity 300ms';
	
	    return { ...provided, opacity, transition };
	  }
	}


	return (
		<>
			<div id={props.id} className="currency-form">
				<input
					id="amount-input"
					type="text"
					pattern="[0-9]"
					value={props.value}
					onChange={event => props.handleAmountChange(event)}
					disabled={props.inputDisabled}
				/>
				<Select
					id="currency-drop"
					options={options}
					styles={customStyles}
					placeholder='USD'
					onChange={event => props.handleCurrencyChange(event)}
				/>
			</div>
		</>
	)
}

export default Interface;
