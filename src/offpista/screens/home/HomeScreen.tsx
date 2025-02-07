import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import CustomText from '../../components/CustomText';
import {ICONS} from '../../utils/Icons';
import {COLORS} from '../../utils/Colors';
import {getDocs, collection} from 'firebase/firestore';
import {db} from '../../firebase/firebaseConfig';
import MovieSection from '../../../components/MovieSection';
import CategorySection from '../../../components/CategorySection';
import {IMAGES} from '../../utils/Images';

const {height, width} = Dimensions.get('window');
interface VideoItem {
  id: string;
  url: string;
  coverImage: string;
  description: string;
}

const movies = [
  {
    id: '1',
    title: 'Better Call Saul',
    description: "A lawyer's twisted path to success",
    image: IMAGES.one,
  },
  {
    id: '2',
    title: 'Movie 2',
    description: 'Journey into the unknown',
    image: IMAGES.two,
  },
  {
    id: '3',
    title: 'The Boys',
    description: "Heroes aren't always heroic",
    image: IMAGES.three,
  },
];

const trending = [
  {
    id: '1',
    title: 'Better Call Saul',
    description: "Breaking bad's brilliant spin-off",
    image: IMAGES.four,
  },
  {
    id: '2',
    title: 'Movie 2',
    description: "Edge of your seat thriller",
    image: IMAGES.five,
  },
  {
    id: '3',
    title: 'The Boys',
    description: "Dark take on superhero genre",
    image: IMAGES.six,
  },
];

const popular = [
  {
    id: '1',
    title: 'Better Call Saul',
    description: "Crime and justice collide",
    image: IMAGES.seven,
  },
  {
    id: '2',
    title: 'Movie 2',
    description: "Action packed adventure",
    image: IMAGES.eight,
  },
  {
    id: '3',
    title: 'The Boys',
    description: "Power corrupts absolutely",
    image: IMAGES.nine,
  },
];

const drama = [
  {
    id: '1',
    title: 'Better Call Saul',
    description: "Morality meets ambition",
    image: IMAGES.ten,
  },
  {
    id: '2',
    title: 'Movie 2',
    description: "Family secrets revealed",
    image: IMAGES.eleven,
  },
  {
    id: '3',
    title: 'The Boys',
    description: "Behind the mask of heroism",
    image: IMAGES.twelve,
  },
];

interface Props {
  navigation: any;
}

const HomeScreen = ({navigation}: Props) => {
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
      initialVideoId: carouselData[activeIndex]?.id,
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
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.carouselSection}>
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
                <TouchableOpacity style={styles.videoContainer}>
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
      </View>

      <View style={styles.moviesListContainer}>
        <MovieSection
          title="Continue Watching"
          movies={movies}
          showDescription={true}
        />
        <MovieSection
          title="Most Trending"
          movies={trending}
          showDescription={true}
        />
        <CategorySection />
        <MovieSection
          title="Popular Movies"
          movies={popular}
          showDescription={true}
        />
        <MovieSection title="Drama" movies={movies} showDescription={true} />
        <MovieSection
          title="Romance"
          movies={trending}
          showDescription={true}
        />
        <MovieSection
          title="Documentary"
          movies={drama}
          showDescription={true}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    margin: 0,
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
  carouselSection: {
    height: height * 0.6,
    width: width,
  },
  moviesListContainer: {
    flex: 1,
    paddingBottom: 20,
    marginTop: 15,
  },
});

export default HomeScreen;
