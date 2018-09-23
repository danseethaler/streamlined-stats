import {remove} from 'lodash';
import React from 'react';
import {IoIosArrowBack} from 'react-icons/io';
import {SetType} from '../../../../redux/redux.definitions';
import ButtonNew from '../../../components/ButtonNew';
import {buildStatsTable} from './services';

interface MatchStatsProps {
  sets: SetType[];
}

interface MatchStatsState {
  selectedSets: string[];
  useMaxPreps: boolean;
}

class MatchStats extends React.Component<MatchStatsProps, MatchStatsState> {
  public state = {
    selectedSets: this.props.sets.map(({id}) => id),
    useMaxPreps: true,
  };

  public handleInputChange = ({target}) => {
    const {name} = target;

    let selectedSets;
    if (target.checked) {
      selectedSets = [...this.state.selectedSets, name];
    } else {
      selectedSets = remove(this.state.selectedSets, setId => setId !== name);
    }

    this.setState({selectedSets});
  };

  public render() {
    const selectedSets = this.props.sets.filter(
      set => this.state.selectedSets.indexOf(set.id) >= 0
    );

    return (
      <div>
        <div>
          <ul>
            {this.props.sets.map(set => (
              <li key={set.id}>
                <label>
                  <input
                    name={set.id}
                    onChange={this.handleInputChange}
                    checked={this.state.selectedSets.indexOf(set.id) >= 0}
                    type="checkbox"
                  />
                  {set.setNumber}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <ButtonNew
          icon={IoIosArrowBack}
          text="Toggle MaxPreps"
          onClick={() => {
            this.setState({useMaxPreps: !this.state.useMaxPreps});
          }}
        />
        {buildStatsTable(selectedSets, this.state.useMaxPreps)}
      </div>
    );
  }
}

export default MatchStats;
