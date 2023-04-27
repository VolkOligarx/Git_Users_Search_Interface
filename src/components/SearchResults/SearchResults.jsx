import SearchElement from '../SearchElement/SearchElement'
import s from './SearchResults.module.scss'

export const SearchResults = (props) => {

    return (
        <div className={s.mainBlock}>
            {
                props.block.data ? props.block.data.items.map((item) => {
                    return (
                        <SearchElement key={item.id} block={item}></SearchElement>
                    )
                }) : null
            }
        </div>
    )
}

export default SearchResults