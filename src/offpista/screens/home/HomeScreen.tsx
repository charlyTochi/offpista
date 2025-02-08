import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
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
    description: "A lawyer's twisted",
    image: IMAGES.one,
  },
  {
    id: '2',
    title: 'Movie 2',
    description: 'Journey the unknown',
    image: IMAGES.two,
  },
  {
    id: '3',
    title: 'The Boys',
    description: "Heroes aren't  heroic",
    image: IMAGES.three,
  },
];

const trending = [
  {
    id: '1',
    title: 'Better Call Saul',
    description: "Breaking bad's ",
    image: IMAGES.four,
  },
  {
    id: '2',
    title: 'Movie 2',
    description: 'Edge of your seat',
    image: IMAGES.five,
  },
  {
    id: '3',
    title: 'The Boys',
    description: 'Dark take on superhero',
    image: IMAGES.six,
  },
];

const popular = [
  {
    id: '1',
    title: 'Better Call Saul',
    description: 'Crime and justice collide',
    image: IMAGES.seven,
  },
  {
    id: '2',
    title: 'Movie 2',
    description: 'Action packed adventure',
    image: IMAGES.eight,
  },
  {
    id: '3',
    title: 'The Boys',
    description: 'Power corrupts absolutely',
    image: IMAGES.nine,
  },
];

const drama = [
  {
    id: '1',
    title: 'Better Call Saul',
    description: 'Morality meets ambition',
    image: IMAGES.ten,
  },
  {
    id: '2',
    title: 'Movie 2',
    description: 'Family secrets revealed',
    image: IMAGES.eleven,
  },
  {
    id: '3',
    title: 'The Boys',
    description: 'Behind the mask of heroism',
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
  const [isBuffering, setIsBuffering] = useState<{[key: string]: boolean}>({});
  const videoRefs = useRef<{[key: string]: any}>({});
  const currentTimeRef = useRef(0);
  const initialLoadRef = useRef(true);

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
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (initialLoadRef.current) {
      timer = setTimeout(() => {
        setPlayTrailer(true);
      }, 3000);
      initialLoadRef.current = false;
    } else {
      setPlayTrailer(false);
      timer = setTimeout(() => {
        setPlayTrailer(true);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handlePlayPress = () => {
    const currentVideo = carouselData[activeIndex];
    if (!currentVideo) return;

    navigation.navigate('Shorts', {
      videoId: currentVideo.id,
      startTime: currentTimeRef.current,
      videoUrl: currentVideo.url,
    });
  };

  const handleScroll = (event: {nativeEvent: {contentOffset: {x: number}}}) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index !== activeIndex) {
      setActiveIndex(index);
      
      Object.entries(videoRefs.current).forEach(([id, ref]) => {
        if (ref) {
          const videoIndex = carouselData.findIndex(item => item.id === id);
          if (Math.abs(videoIndex - index) > 1) {
            ref.seek(0);
            currentTimeRef.current = 0;
          }
        }
      });
    }
  };

  const renderVideo = (item: VideoItem, index: number) => {
    const isCurrentVideo = activeIndex === index;
    const shouldPlay = playTrailer && isCurrentVideo;

    return (
      <View style={styles.mediaContainer}>
        {shouldPlay ? (
          <TouchableOpacity
            style={styles.videoContainer}
            onPress={handlePlayPress}
            activeOpacity={1}>
            <Video
              ref={ref => (videoRefs.current[item.id] = ref)}
              source={{uri: item.url}}
              style={styles.video}
              resizeMode="cover"
              muted={true}
              repeat={true}
              playInBackground={false}
              playWhenInactive={false}
              onProgress={({currentTime}) => {
                if (isCurrentVideo) {
                  currentTimeRef.current = currentTime;
                }
              }}
              progressUpdateInterval={100}
              onBuffer={({isBuffering: buffering}) => {
                setIsBuffering(prev => ({...prev, [item.id]: buffering}));
              }}
              bufferConfig={{
                minBufferMs: 15000,
                maxBufferMs: 50000,
                bufferForPlaybackMs: 2500,
                bufferForPlaybackAfterRebufferMs: 5000,
              }}
              maxBitRate={Platform.OS === 'android' ? 2000000 : undefined}
              onLoadStart={() => {
                setIsBuffering(prev => ({...prev, [item.id]: true}));
              }}
              onLoad={() => {
                setIsBuffering(prev => ({...prev, [item.id]: false}));
              }}
            />
            {isBuffering[item.id] && (
              <View style={styles.bufferingContainer}>
                <ActivityIndicator color="white" size="large" />
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <ImageBackground
            source={{uri: item.coverImage}}
            style={styles.videoContainer}
            imageStyle={styles.coverImage}
            resizeMode="cover"
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
    );
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
          renderItem={({item, index}) => renderVideo(item, index)}
          removeClippedSubviews={Platform.OS === 'android'}
          maxToRenderPerBatch={2}
          windowSize={3}
          initialNumToRender={2}
          onScrollToIndexFailed={() => {}}
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
    padding: 0,
  },
  mediaContainer: {
    width: width,
    height: height * 0.75,
    backgroundColor: COLORS.secondary,
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
  videoContainer: {
    width: width,
    height: '100%',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: COLORS.secondary,
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.secondary,
  },
  overlayContent: {
    position: 'absolute',
    width: width,
    height: '100%',
    justifyContent: 'space-between',
    zIndex: 1,
    margin: 0,
    padding: 0,
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
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tag: {
    color: COLORS.ash,
    borderRadius: 8,
    padding: 7,
    marginRight: 8,
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
    width: width,
    height: height * 0.75,
    margin: 0,
    padding: 0,
  },
  moviesListContainer: {
    flex: 1,
    paddingBottom: 20,
    marginTop: 15,
  },
  bufferingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  coverImage: {
    // Add any necessary styles for the cover image
  },
});

export default HomeScreen;
