import s from './SearchElement.module.scss'
import axios from 'axios'
import { useState } from 'react'

export const SearchElement = (props) => {
    const [personInfo, setPersonInfo] = useState([])
    const [created, setCreated] = useState([])
    const [visible, setVisible] = useState('block')
    const [hidden, setHidden] = useState('none')

    const showMore = async () => {
        try {
            const res = await axios.get(`${props.block.url}`)
            setPersonInfo(res.data)
            const date = res.data.created_at.slice(0, 10)
            setCreated(date)
            setVisible('none')
            setHidden('block')
        } catch (error) {
            console.log(error);
            alert('Достигнуто максимальное число запросов, повторите запрос через 2 минуты')
        }
    }

    return (
        <div onClick={()=>{showMore()}} className={s.mainBlock}>
            <img className={s.mainBlock_avatar} src={props.block.avatar_url} alt='avatar'/>
            <div>
                <p className={s.mainBlock_login}>{props.block.login}</p>
                <h3 className={s.mainBlock_h3} style={{ display: `${visible}` }}>Показать больше...</h3>
                <a className={s.mainBlock_a} href={personInfo.html_url} style={{ display: `${hidden}` }}>Перейти на страницу пользователя</a>
                <p className={s.mainBlock_p} style={{ display: `${hidden}` }}>Подписчики: {personInfo.followers}</p>
                <p className={s.mainBlock_p} style={{ display: `${hidden}` }}>Подписки: {personInfo.following}</p>
                <p className={s.mainBlock_p} style={{ display: `${hidden}` }}>Создано: {created} </p>
            </div>
        </div>
    )
}

export default SearchElement