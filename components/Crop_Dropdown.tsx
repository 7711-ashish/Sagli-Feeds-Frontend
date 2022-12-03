import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';


  const Dropdown_Crop = (props) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const title1 = props.title;
    //console.log(props);
    let data=[];
    if(title1=="year")
    {
        var y=2001;
        for(var i=1;i<=14;i++)
        {
            var obj={
                label: y.toString(),
                 value: y.toString()
            }
            data.push(obj);
            y=y+1;
        }
        //console.log(data);

    }
    else if(title1=="Season")
    {
        data=[
            { label: 'Kharif', value: 'Kharif' },
            { label: 'Rabi', value: 'Rabi' },
            { label: 'Summer', value: 'Summer' },
            ];
    }
    else
    {
        data=[
            { label: 'Arhar\/Tur', value: 'Arhar\/Tur' },
            { label: 'Bajra', value: 'Bajra' },
            { label: 'Castor seedmer', value: 'Castor seed' },
            { label: 'Cotton(lint)', value: 'Cotton(lint)' },
            { label: 'Groundnut', value: 'Groundnut' },
            { label: 'Moong(Green Gram)', value: 'Moong(Green Gram)' },
            { label: 'Rice', value: 'Rice' },
            { label: 'Sesamum', value: 'Sesamum' },
            { label: 'Soyabean', value: 'Soyabean' },
            { label: 'Sugarcane', value: 'Sugarcane' },
            { label: 'Sunflower', value: 'Sunflower' },
            { label: 'Urad', value: 'Urad' },
            { label: 'Gram', value: 'Gram' },
            { label: 'Rapeseed &Mustard', value: 'Rapeseed &Mustard' },
            { label: 'Safflower', value: 'Safflower' },
            { label: 'Wheat', value: 'Wheat' },
            { label: 'Jowar', value: 'Jowar' },
            { label: 'Maize', value: 'Maize' },
            { label: 'Niger seed', value: 'Niger seed' },
            { label: 'Ragi', value: 'Ragi' },
            { label: 'Small millets', value: 'Small millets' }

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
          style={[styles.dropdown, isFocus && { borderColor: 'blue' },!isFocus && { borderColor: props.color }]}
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
            if(title1=='year')
            {
                {props.handleSelect({type: 'year',value:item.value})}
            }
            else if(title1=='Season')
            {
                {props.handleSelect({type: 'Season',value:item.value})}
            }
            else
            {
                {props.handleSelect({type: 'Crops',value:item.value})}
            }
            console.log(item.value)
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : props.color}
              name="Safety"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  export default Dropdown_Crop;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.65)',
      padding: 15,
      margin:15,
      marginTop:10,
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