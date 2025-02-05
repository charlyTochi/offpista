import React, {useRef} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import {ICONS} from './src/offpista/utils/Icons';
import {SizeUtils} from './src/offpista/utils/SizeUtils';
import CustomText from './src/offpista/components/CustomText';
import {COLORS} from './src/offpista/utils/Colors';

const {width, height} = Dimensions.get('window');

interface VideoItem {
  id: string;
  uri: string;
  title: string;
  description: string;
}

const videos: VideoItem[] = [
  {
    id: '1',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Secrets Billionaire',
    description:
      'To escape a politically motivated arranged marriage, a privileged heir Lucas is the best mujol ',
  },
  {
    id: '2',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Mystery Unfolds',
    description: 'A detective stumbles upon a case that changes everything...',
  },
  {
    id: '3',
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Action Packed',
    description: 'A rogue agent fights against corruption and injustice...',
  },
];

const ReelsScreen: React.FC = () => {
  const videoRefs = useRef<Array<any>>([]);

  const renderItem = ({item, index}: {item: VideoItem; index: number}) => (
    <View style={styles.container}>
      {/* Video Background */}
      <Video
        ref={ref => (videoRefs.current[index] = ref)}
        source={{uri: item.uri}}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted
      />

      {/* Top Left Search Icon */}
      <TouchableOpacity style={styles.searchIcon}>
        {ICONS.searchIcon}
      </TouchableOpacity>

      {/* Right Sidebar Icons */}
      <View style={styles.rightSidebar}>
        <TouchableOpacity>
          {ICONS.loveIcon}
          <CustomText style={styles.iconText}>11.5K</CustomText>
        </TouchableOpacity>
        <TouchableOpacity>
          {ICONS.forwardIcon}
          <CustomText style={styles.iconText}>312</CustomText>
        </TouchableOpacity>
        <TouchableOpacity>
          {ICONS.favoriteIcon}
          <CustomText style={styles.iconText}>20</CustomText>
        </TouchableOpacity>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <CustomText weightType="bold" style={styles.title}>
          {item.title}
        </CustomText>
        <CustomText ellipsizeMode="tail" truncateAt={75} style={styles.description}>
          {item.description}
        </CustomText>
        <TouchableOpacity style={styles.watchButton}>
          <CustomText style={styles.watchButtonText}>▶ Watch Now</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToAlignment="start"
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  playButton: {},
  container: {
    width,
    height,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  searchIcon: {
    position: 'absolute',
    top: 70,
    left: 20,
  },
  rightSidebar: {
    position: 'absolute',
    gap: 20,
    right: 20,
    bottom: 55,
    alignItems: 'center',
  },
  iconText: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
  },
  description: {
    color: COLORS.white,
    fontSize: 14,
    width: SizeUtils.responsiveWidth(80),
    marginTop: 5,
  },
  watchButton: {
    backgroundColor: '#F30745',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    width: SizeUtils.responsiveWidth(60),
    alignItems: 'center',
  },
  watchButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReelsScreen;
