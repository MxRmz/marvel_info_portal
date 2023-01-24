import { Component } from 'react/cjs/react.production.min';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService'
import CharInfo from '../charInfo/CharInfo';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onCharsLoaded = (chars) => {
        this.setState({
            chars,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
            }

    componentDidMount() {
        this.updateChar();

    }

    render () {
        const {chars, loading, error} = this.state
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const view = chars.map(char => {
            return  (<li className="char__item" onClick={() => {this.props.updateData(char)}}>
                    <img src={char.thumbnail} alt={char.name}/>
                    <div className="char__name">{char.name}</div>
                </li>)
            
            
 /*            (
                <View
                    key={char.id}
                    id={char.id}
                    name={char.name}
                    thumbnail={char.thumbnail}
                />
                ) */
        })
        const content = !(loading || error) ? view : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {view}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = ({id, name, thumbnail}) => {
        return (<li className="char__item" onClick={this.setId(id)}>
                    <img src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>)
}

export default CharList;