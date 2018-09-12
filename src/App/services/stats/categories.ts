import {cloneDeep} from 'lodash';
import statDefinitions from './stats';
import {
  StatCategories,
  StatCategoryType,
  StatDefinitionType,
  StatRecordingType,
} from './stats.definitions';

export const getFlatStatDefinitions = (
  manualOnly = false
): StatDefinitionType[] =>
  statDefinitions.reduce(
    (flatStats, {name, stats}) => [
      ...flatStats,
      ...stats
        .filter(
          ({recordingType}) =>
            !manualOnly || recordingType === StatRecordingType.manual
        )
        .map(stat => ({...stat, categoryName: name})),
    ],
    []
  );

interface StatDefinitionWithCategory extends StatDefinitionType {
  category: StatCategories;
}

export const getStatDefinition = (shorthandArg): StatDefinitionWithCategory => {
  let stat;
  const category = statDefinitions.filter(({stats, name}) => {
    const statMatch = stats.find(({shorthand}) => shorthand === shorthandArg);
    if (statMatch) {
      stat = statMatch;
      return true;
    }
  });

  return {
    ...stat,
    category: category[0].name,
  };
};

export const getStatCategoryDefinitions = () => cloneDeep(statDefinitions);

export const getStatDefinitions = () => {
  const definitions = cloneDeep(statDefinitions);

  return definitions.reduce(
    (filteredArray, category) => filteredArray.concat(category.stats),
    []
  );
};

export const getCategoriesByName = (
  categoryName: StatCategories[],
  allStats?: boolean
): StatCategoryType[] => {
  const categories = allStats ? statDefinitions : getManualRecordedStats();
  return categories.filter(({name}) => categoryName.indexOf(name) >= 0);
};

export const getManualRecordedStats = () =>
  getStatCategoryDefinitions().reduce((filteredArray, category) => {
    const stats = category.stats.filter(
      ({recordingType}) => recordingType === StatRecordingType.manual
    );

    if (stats.length) {
      category.stats = stats;
      filteredArray.push(category);
    }

    return filteredArray;
  }, []);
