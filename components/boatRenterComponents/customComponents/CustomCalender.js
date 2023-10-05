import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';

export default function CustomCalender({}) {
const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };



  return (

        <DateTimePicker
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
        />
    
  );
};