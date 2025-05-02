import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {Platform} from 'react-native';

const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:2500' : 'http://localhost:2500';

const MilkRideApp = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Home');
  const [gaushalas, setGaushalas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchGaushalas = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/api/gaushalas/approved`);
        setGaushalas(response.data);
        console.log('Fetched gaushalas:', response.data);
      } catch (error) {
        console.error('Error fetching gaushalas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGaushalas();
  }, []);

  const GaushalaCard = ({item}) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image
          source={{
            uri: `${BASE_URL}/api/gaushalas/${item._id}/photo`,
          }}
          style={styles.productImage}
        />
      </View>
      <Text style={styles.productName} numberOfLines={1}>
        {item.gaushalaName}
      </Text>
      <Text style={styles.productName} numberOfLines={1}>
        {item.address}
      </Text>
      <Text style={styles.productPrice}>Milk: {item.milkCapacity}L</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Buy now</Text>
      </TouchableOpacity>
    </View>
  );

  const categories = ['All', 'Cheese', 'Cheese', 'Cheese'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/149/149852.png',
            }}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="What do you looking for?"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3161/3161370.png',
              }}
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryChip,
              index === 0 ? styles.activeCategoryChip : null,
            ]}>
            <Text
              style={[
                styles.categoryText,
                index === 0 ? styles.activeCategoryText : null,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Deal Banner */}
      <View style={styles.dealsBanner}>
        <View style={styles.dealsBannerContent}>
          <View>
            <Text style={styles.dealsText}>Deals</Text>
            <Text style={styles.dealsSubtext}>20% Off all items</Text>
          </View>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.personContainer}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3721/3721906.png',
            }}
            style={styles.personImage}
          />
        </View>
      </View>

      {/* Exclusive Offer */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Exclusive Offer</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Gaushala List */}
      <View style={styles.gaushalaListContainer}>
        <FlatList
          data={gaushalas}
          renderItem={({item}) => <GaushalaCard item={item} />}
          keyExtractor={item => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {isLoading ? 'Loading gaushalas...' : 'No gaushalas available'}
            </Text>
          }
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setSelectedTab('Home')}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png',
            }}
            style={[
              styles.navIcon,
              selectedTab === 'Home' ? styles.activeNavIcon : null,
            ]}
          />
          <Text
            style={[
              styles.navText,
              selectedTab === 'Home' ? styles.activeNavText : null,
            ]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setSelectedTab('Orders')}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2811/2811806.png',
            }}
            style={[
              styles.navIcon,
              selectedTab === 'Orders' ? styles.activeNavIcon : null,
            ]}
          />
          <Text
            style={[
              styles.navText,
              selectedTab === 'Orders' ? styles.activeNavText : null,
            ]}>
            Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setSelectedTab('Cart')}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
            }}
            style={[
              styles.navIcon,
              selectedTab === 'Cart' ? styles.activeNavIcon : null,
            ]}
          />
          <Text
            style={[
              styles.navText,
              selectedTab === 'Cart' ? styles.activeNavText : null,
            ]}>
            Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setSelectedTab('Profile')}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
            }}
            style={[
              styles.navIcon,
              selectedTab === 'Profile' ? styles.activeNavIcon : null,
            ]}
          />
          <Text
            style={[
              styles.navText,
              selectedTab === 'Profile' ? styles.activeNavText : null,
            ]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  menuLine: {
    height: 2,
    backgroundColor: '#333',
    width: 18,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginLeft: 12,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 36,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  filterIcon: {
    width: 18,
    height: 18,
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#f5f5f5',
  },
  activeCategoryChip: {
    backgroundColor: '#2196F3',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  activeCategoryText: {
    color: '#fff',
  },
  dealsBanner: {
    backgroundColor: '#2196F3',
    margin: 16,
    borderRadius: 12,
    height: 120,
    overflow: 'hidden',
    flexDirection: 'row',
    position: 'relative',
  },
  dealsBannerContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  dealsText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dealsSubtext: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  buyNowButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  buyNowText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  personContainer: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  personImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#2196F3',
  },
  gaushalaListContainer: {
    flex: 1,
    marginBottom: 60, // Space for bottom nav
  },
  productList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  productCard: {
    width: 160,
    marginRight: 12,
  },
  productImageContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 14,
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    tintColor: '#999',
  },
  activeNavIcon: {
    tintColor: '#2196F3',
  },
  navText: {
    fontSize: 12,
    color: '#999',
  },
  activeNavText: {
    color: '#2196F3',
  },
  emptyText: {
    padding: 20,
    textAlign: 'center',
    color: '#999',
  },
});

export default MilkRideApp;
