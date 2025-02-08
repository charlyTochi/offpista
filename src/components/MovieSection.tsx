import React from 'react';
import {View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import CustomText from '../offpista/components/CustomText';
import {ICONS} from '../offpista/utils/Icons';
import {COLORS} from '../offpista/utils/Colors';

const {height} = Dimensions.get('window');

interface Movie {
  id: string;
  title: string;
  image: any;
  description: string;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  showDescription?: boolean;
}

const MovieSection = ({
  title,
  movies,
  showDescription = false,
}: MovieSectionProps) => {
  return (
    <View style={styles.moviesSection}>
      <TouchableOpacity style={styles.sectionHeader}>
        <CustomText weightType="bold" style={styles.sectionTitle}>
          {title}
        </CustomText>
        <View style={{marginRight: 15}}>
          {ICONS.arrowIcon}
        </View>
      </TouchableOpacity>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.movieContainer}>
            <Image source={item.image} style={styles.movieImage} />
            {showDescription && (
              <>
                <CustomText style={styles.movieName}>{item.title}</CustomText>
                <CustomText weightType="bold" style={styles.movieDesc}>
                  {item.description}
                </CustomText>
              </>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  moviesSection: {
    height: height * 0.35,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 21,
    marginBottom: 10,
  },
  movieContainer: {
    width: 146,
    marginRight: 15,
  },
  movieName: {
    fontSize: 12,
    marginTop: 10,
    color: COLORS.iconGray,
  },
  movieDesc: {
    fontSize: 14,
    color: COLORS.white,
    marginTop: 4,
  },
  movieImage: {
    width: 120,
    height: 160,
    borderRadius: 10,
  },
});

export default MovieSection;
