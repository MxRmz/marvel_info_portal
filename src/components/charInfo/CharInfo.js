import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comics: {},
            loading: true,
            error: false
        }
    }

    marvelService = new MarvelService();

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onComicsLoaded = (comics) => {
        this.setState({
            comics,
            loading: false
        })
    }

    updateComics = (id) => {
        this.marvelService
            .getComics(id)
            .then(this.onComicsLoaded)
            .catch(this.onError);
            }

    componentDidMount() {
        this.updateComics(this.props.char.id);
    }

    componentDidUpdate(pervProps, prevState) {
        if (this.props.char.id !== pervProps.char.id) {
            this.updateComics(this.props.char.id);
        }


    }

    render() {
        
        let {name, discription, wiki, homepage, thumbnail} = this.props.char
        let {loading, error} = this.state
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? console.log(this.state.comics) : null;
        console.log(this.state.comics)
        return (
            <div className="char__info">
                <div className="char__basics">
                    <img src={thumbnail} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">Homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {discription}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    <li className="char__comics-item">
                        All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    <li className="char__comics-item">
                        Alpha Flight (1983) #50
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #503
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #504
                    </li>
                    <li className="char__comics-item">
                        AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Vengeance (2011) #4
                    </li>
                    <li className="char__comics-item">
                        Avengers (1963) #1
                    </li>
                    <li className="char__comics-item">
                        Avengers (1996) #1
                    </li>
                </ul>
            </div>
        )
    }
}

export default CharInfo;