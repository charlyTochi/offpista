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
import {ICONS} from '../../utils/Icons';
import {COLORS} from '../../utils/Colors';
import {getDocs, collection} from 'firebase/firestore';
import {db} from '../../firebase/firebaseConfig';

const {height, width} = Dimensions.get('window');
interface VideoItem {
  id: string;
  url: string;
  coverImage: string;
}

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

interface Props {
  navigation: any;
}

const HomeScreen = ({ navigation }: Props) => {
  const [playTrailer, setPlayTrailer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselData, setCarouselData] = useState<VideoItem[]>([]);
  const [, setLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const fetchedVideos = querySnapshot.docs.map(doc => {
          const data = doc.data() as Omit<VideoItem, 'id'>; // Exclude `id` from spreading
          return {id: doc.id, ...data}; // Ensure `id` is set properly
        });

        setCarouselData(fetchedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayTrailer(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handlePlayPress = () => {
    navigation.navigate('Shorts', {
      initialVideoId: carouselData[activeIndex]?.id
    });
  };

  const handleScroll = (event: {nativeEvent: {contentOffset: {x: number}}}) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index !== activeIndex) {
      setActiveIndex(index);
      setPlayTrailer(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={carouselData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View style={styles.mediaContainer}>
            {playTrailer && activeIndex === index ? (
              <TouchableOpacity
                onPress={handlePlayPress}
                style={styles.videoContainer}>
                <Video
                  ref={videoRef}
                  source={{uri: item?.url}}
                  style={styles.video}
                  resizeMode="cover"
                  muted
                  repeat
                />
              </TouchableOpacity>
            ) : (
              <ImageBackground
                source={{uri: item?.coverImage}}
                style={styles.videoContainer}
              />
            )}
            <View style={styles.overlayContent}>
              <View style={styles.searchIcon}>{ICONS.searchIcon}</View>
              <View style={styles.bottomSection}>
                <TouchableOpacity 
                  style={styles.playButton}
                  onPress={handlePlayPress}>
                  <CustomText weightType="bold" style={styles.playText}>
                    ▶ Play
                  </CustomText>
                </TouchableOpacity>
                <View style={styles.paginationContainer}>
                  {carouselData.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        activeIndex === index && styles.activeDot,
                      ]}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
      />
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
    width,
  },
  videoContainer: {
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
  },
  searchIcon: {
    marginTop: 30,
  },
  bottomSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: COLORS.white,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 8,
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
  playText: {
    fontSize: 17,
    color: COLORS.secondary,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ash,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 16,
    height: 8,
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
