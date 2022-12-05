import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';


  const Dropdown_soil = (props) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const title1 = props.title;

    let data=[];
    if(title1=="Soil Temperatue")
    {
        data = [
        { label: '0 cm', value: '0' },
        { label: '6 cm', value: '6' },
        { label: '18 cm', value: '18' },
        { label: '54 cm', value: '54' },
        ];
    }
    else{
        data=[
        { label: '0-1 cm', value: '0-1' },
        { label: '1-3 cm', value: '1-3' },
        { label: '3-9 cm', value: '3-9' },
        { label: '9-27 cm', value: '9-27' },
        { label: '27-81 cm', value: '27-81' },
        ];
    }

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            {title1}
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? `${title1}` : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            {props.handleSelect(item.value)}
            console.log(item.value)
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  export default Dropdown_soil;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.55)',
      padding: 15,
      margin:15,
      marginTop:30,
      borderRadius: 20,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });