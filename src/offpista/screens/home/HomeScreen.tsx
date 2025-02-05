import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import CustomText from '../../components/CustomText';
import { ICONS } from '../../utils/Icons';
import { COLORS } from '../../utils/Colors';

const {height} = Dimensions.get('window');

const movies = [
  {
    id: '1',
    title: 'Better Call Saul',
    image:
      'https://097d0e9f.customer.static.core.one.accedo.tv/097d0e9f2de0f04b/image/collection/STSU/backdrop/landscape/3840x2160_heroh_io?locale=en&t=resize%3Aw1920%7Cgradient%3Aup%2C0F001F%2C17%7Cgradient%3Aright%2C0F001F%2C100%7Ccrop%3Alandscape',
  },
  {
    id: '2',
    title: 'Movie 2',
    image:
      'https://097d0e9f.customer.static.core.one.accedo.tv/097d0e9f2de0f04b/image/collection/STSU/backdrop/landscape/3840x2160_heroh_io?locale=en&t=resize%3Aw1920%7Cgradient%3Aup%2C0F001F%2C17%7Cgradient%3Aright%2C0F001F%2C100%7Ccrop%3Alandscape',
  },
  {
    id: '3',
    title: 'The Boys',
    image:
      'https://097d0e9f.customer.static.core.one.accedo.tv/097d0e9f2de0f04b/image/collection/STSU/backdrop/landscape/3840x2160_heroh_io?locale=en&t=resize%3Aw1920%7Cgradient%3Aup%2C0F001F%2C17%7Cgradient%3Aright%2C0F001F%2C100%7Ccrop%3Alandscape',
  },
];

const trailerSource = {
  uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
};

const coverImage =
  'https://097d0e9f.customer.static.core.one.accedo.tv/097d0e9f2de0f04b/image/collection/STSU/backdrop/landscape/3840x2160_heroh_io?locale=en&t=resize%3Aw1920%7Cgradient%3Aup%2C0F001F%2C17%7Cgradient%3Aright%2C0F001F%2C100%7Ccrop%3Alandscape';

const HomeScreen = () => {
  const [playTrailer, setPlayTrailer] = useState(false);
  const [, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayTrailer(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayPress = () => {
    console.log('hhh');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mediaContainer}>
        {playTrailer ? (
          <TouchableOpacity
            onPress={handlePlayPress}
            style={styles.videoContainer}>
            <Video
              ref={videoRef}
              source={trailerSource}
              style={styles.video}
              resizeMode="cover"
              muted
              repeat
              onProgress={data => setCurrentTime(data.currentTime)}
            />
          </TouchableOpacity>
        ) : (
          <ImageBackground
            source={{uri: coverImage}}
            style={styles.videoContainer}
          />
        )}
        <View style={styles.overlayContent}>
          <View style={styles.searchIcon}>{ICONS.searchIcon}</View>
          <View style={styles.bottomSection}>
            <View style={styles.tagsContainer}>
              <CustomText style={styles.tag}>New</CustomText>
              <CustomText style={styles.tag}>Detective</CustomText>
              <CustomText style={styles.tag}>Crime</CustomText>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <CustomText weightType="bold" style={styles.playText}>
                ▶ Play
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.moviesSection}>
        <CustomText weightType="bold" style={styles.sectionTitle}>
          Continue Watching
        </CustomText>
        <FlatList
          data={movies}
          horizontal
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.movieContainer}>
              <Image source={{uri: item.image}} style={styles.movieImage} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  mediaContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  videoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlayContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    padding: 20,
  },
  searchIcon: {
    marginTop: 30,
  },
  bottomSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tag: {
    color: COLORS.ash,
    borderRadius: 8,
    padding: 7,
    marginRight: 5,
    borderWidth: 1,
    borderColor: COLORS.ash,
  },
  playButton: {
    backgroundColor: COLORS.white,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 8,
  },
  playText: {
    fontSize: 17,
    color: COLORS.secondary,
  },
  moviesSection: {
    height: height * 0.3,
    padding: 10,
    paddingTop: 15,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 21,
    marginBottom: 10,
  },
  movieContainer: {
    marginRight: 15,
    width: 120,
  },
  movieImage: {
    width: 120,
    height: 160,
    borderRadius: 10,
  },
});

export default HomeScreen;
