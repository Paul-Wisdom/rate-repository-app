import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebouncedCallback } from 'use-debounce'
import React, { useContext, useState } from 'react';
import RepositoriesSortContext from '../context/RepositoriesSort';

const styles = StyleSheet.create({
  separator: {
    height: 7,
  },
});

// const repositories = [
//   {
//     id: 'jaredpalmer.formik',
//     fullName: 'jaredpalmer/formik',
//     description: 'Build forms in React, without the tears',
//     language: 'TypeScript',
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
//   },
//   {
//     id: 'rails.rails',
//     fullName: 'rails/rails',
//     description: 'Ruby on Rails',
//     language: 'Ruby',
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
//   },
//   {
//     id: 'django.django',
//     fullName: 'django/django',
//     description: 'The Web framework for perfectionists with deadlines.',
//     language: 'Python',
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
//   },
//   {
//     id: 'reduxjs.redux',
//     fullName: 'reduxjs/redux',
//     description: 'Predictable state container for JavaScript apps',
//     language: 'TypeScript',
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
//   },
// ];

const Menu = React.memo(() => {
  const style = StyleSheet.create({
    input: {
      borderColor: theme.colors.textSecondary,
      borderRadius: 2,
      width: '100%',
      marginTop: 2,
      borderWidth: 2,
      color: theme.colors.textSecondary,
      paddingLeft: 10
    },
  })
  const [setOrderBy, setOrderDirection, setSearchKeyword, searchKeyword] = useContext(RepositoriesSortContext);
  const [sort, setSort] = useState('latest');
  const debounced = useDebouncedCallback((value) => {
    console.log(value)
    setSearchKeyword(value)
  }, 500)
  const handleChange = (itemValue, itemIndex) => {
    switch (itemValue) {
      case 'latest':
        setSort('latest')
        setOrderBy('CREATED_AT')
        setOrderDirection('DESC')
        break;
      case 'highest':
        setSort('highest')
        setOrderBy('RATING_AVERAGE')
        setOrderDirection('DESC')
        break;
      case 'lowest':
        setSort('lowest')
        setOrderBy('RATING_AVERAGE')
        setOrderDirection('ASC')
        break;
    }
  }

  return (
    <View style={{ backgroundColor: 'white', padding: 10 }}>
      <TextInput style={style.input} placeholder='Search' value={searchKeyword} onChangeText={debounced} />
      <Text>sort by:</Text>
      <Picker onValueChange={handleChange} selectedValue={sort}>
        <Picker.Item label='latest' value={'latest'} />
        <Picker.Item label='highest rated' value={'highest'} />
        <Picker.Item label='lowest rated' value={'lowest'} />
      </Picker>
    </View>
  )
})

export const ItemSeparator = () => <View style={styles.separator} />;

// export class RepositoryListContainer extends React.Component {

//   renderHeader = () => {
//     return (
//       <Menu />
//     );
//   };

//   render() {
//     const { repositories, navigate, onEndReached } = this.props;
//     const repositoriesNodes = repositories ? repositories.edges.map(r => r.node) : []

//     return (
//       <FlatList
//         data={repositoriesNodes}
//         ItemSeparatorComponent={ItemSeparator}
//         renderItem={(repository) => <Pressable onPress={() => navigate(`/repositories/${repository.item.id}`)}><RepositoryItem repository={repository.item} /></Pressable>}
//         keyExtractor={r => r.id}
//         ListHeaderComponent={this.renderHeader}
//         onEndReached={onEndReached}
//         onEndReachedThreshold={0.5}
//       />
//     );
//   }
// }

export const RepositoryListContainer = ({ repositories, onEndReached }) => {
  const repositoriesNodes = repositories ? repositories.edges.map(r => r.node) : []
  const navigate = useNavigate()

  return (
    <FlatList
      data={repositoriesNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(repository) => <Pressable onPress={() => navigate(`/repositories/${repository.item.id}`)}><RepositoryItem repository={repository.item} /></Pressable>}
      keyExtractor={r => r.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={<Menu />}
    />
  )


}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setorderDirection] = useState('DESC')
  const [searchKeyword, setSearchKeyword] = useState('')

  const navigate = useNavigate()

  const { data, error, loading, fetchMore } = useRepositories({ orderBy, orderDirection, searchKeyword, first: 10 })
  const repositories = data ? data.repositories : null

  const onEndReached = async () => {
    await fetchMore()
  }


  return (<>
    {error && <Text style={{ color: theme.error.primary }}>{error.message}</Text>}
    {loading && <Text>loading ...</Text>}
    {data && <RepositoriesSortContext.Provider value={[setOrderBy, setorderDirection, setSearchKeyword, searchKeyword]}>
      <RepositoryListContainer repositories={repositories} onEndReached={onEndReached} navigate={navigate}/>
    </RepositoriesSortContext.Provider>
    }
  </>
  );
};

export default RepositoryList;