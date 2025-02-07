import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../offpista/components/CustomText';
import {COLORS} from '../offpista/utils/Colors';

const {width} = Dimensions.get('window');

interface Category {
  id: string;
  name: string;
  colors: string[];
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Drama',
    colors: ['#8E9EAB', '#6B7B8C'],
  },
  {
    id: '2',
    name: 'Crime',
    colors: ['#2193b0', '#6dd5ed'],
  },
  {
    id: '3',
    name: 'Comedy',
    colors: ['#FF8489', '#D5505C'],
  },
  {
    id: '4',
    name: 'Action',
    colors: ['#4B79A1', '#283E51'],
  },
];

const CategorySection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <CustomText weightType="bold" style={styles.title}>
          By Category
        </CustomText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {categories.map(category => (
          <TouchableOpacity key={category.id}>
            <LinearGradient
              colors={category.colors}
              style={styles.categoryCard}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <CustomText weightType="bold" style={styles.categoryText}>
                {category.name}
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: 21,
    marginLeft: 10
  },
  scrollContainer: {
    paddingHorizontal: 1,
  },
  categoryCard: {
    width: width * 0.44,
    height: 100,
    borderRadius: 12,
    justifyContent: 'flex-end',
    padding: 5,
  },
  categoryText: {
    color: COLORS.white,
    fontSize: 21,
    marginBottom: 10,
    padding: 5,
  },
});

export default CategorySection;
