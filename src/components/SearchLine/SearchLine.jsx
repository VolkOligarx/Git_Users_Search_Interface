import axios from 'axios'
import { useState } from 'react'
import SearchResults from '../SearchResults/SearchResults'
import s from './SearchLine.module.scss'

export const SearchLine = () => {
    const [input, setInput] = useState('')
    const [respond, setRespond] = useState([])
    const [sort, setSort] = useState('repositories')
    const [order, setOrder] = useState('desc')
    const [sortedBy, setSortedBy] = useState('убыванию')
    const [buttonsVision, setButtonsVision] = useState(['none', 'none'])
    const [page, setPage] = useState(1)

    let newOrder
    let totalResultCount = 10
    let newPage = 1


    const getUsers = async (outSort, outOrder) => {

        if (outSort && outOrder) {
        try {
            const res = await axios.get(`https://api.github.com/search/users?q=${input}&sort=${outSort}&order=${outOrder}&page=1&per_page=12`)
            setRespond(res)
            totalResultCount = res.data.total_count/12

        } catch (error) {
            console.log(error);
            alert('Достигнуто максимальное число запросов, повторите запрос через 2 минуты')
        }}
        else {
        try {
            const res = await axios.get(`https://api.github.com/search/users?q=${input}&sort=${sort}&order=${order}&page=${newPage}&per_page=12`)
            setRespond(res)
            totalResultCount = res.data.total_count/12

        } catch (error) {
            console.log(error);
            alert('Достигнуто максимальное число запросов, повторите запрос через 2 минуты')
        }}
    }

    const choosenPage = (clickedPage) => {
        setPage(clickedPage)
        newPage = clickedPage
        getUsers()
    }

    const sendForm = (e) => {
        e.preventDefault()
        input === '' ? alert('Введите запрос') : getUsers() && setButtonsVision(['block', 'flex'])
    }

    const sortFunc = (type) => {
        setPage(1)
        newPage = 1
        switch (type) {
            case "Followers":
                setSort('followers')
                if (order === 'asc') {
                    newOrder = 'desc'
                    setOrder('desc')
                    setSortedBy('убыванию')
                }
                else {
                    newOrder = 'asc'
                    setOrder('asc')
                    setSortedBy('возрастанию')
                }
                getUsers('followers', newOrder)

                break;

            case "Repositories":
                setSort('repositories')
                if (order === 'asc') {
                    newOrder = 'desc'
                    setOrder('desc')
                    setSortedBy('убыванию')
                }
                else {
                    newOrder = 'asc'
                    setOrder('asc')
                    setSortedBy('возрастанию')
                }
                getUsers('repositories', newOrder)

                break;

            case "Joined":
                setSort('joined')
                if (order === 'asc') {
                    newOrder = 'desc'
                    setOrder('desc')
                    setSortedBy('убыванию')
                }
                else {
                    newOrder = 'asc'
                    setOrder('asc')
                    setSortedBy('возрастанию')
                }
                getUsers('joined', newOrder)

                break;    
            default:
                break;
        }
    }
    
    return (
        <div className={s.upperContainer}>
            <form className={s.search} onSubmit={(e)=>{sendForm(e)}}>
                <img className={s.search_Icon} src='./img/searchIcon.svg' alt='search'/>
                <input className={s.search_Input} type='search' placeholder='Поиск' value={input} onChange={(e) => setInput(e.target.value)}/>
                <button onClick={() => {setPage(1)}} className={s.animatedWord}>Найти!</button>
            </form>
            <div className={s.lowerContainer} style={{display: buttonsVision[0]}}>
                <button onClick={() => sortFunc('Followers')} className={s.btnFlip} data-back={`по ${sortedBy}`} data-front="Followers"></button>
                <button onClick={() => sortFunc('Repositories')} className={s.btnFlip} data-back={`по ${sortedBy}`} data-front="Repositories"></button>
                <button onClick={() => sortFunc('Joined')} className={s.btnFlip} data-back={`по ${sortedBy}`} data-front="Joined"></button>
                
            </div>
            <SearchResults block={respond}></SearchResults>
            <div style={{display: buttonsVision[1]}} className={s.search_page_line}>
                {
                    totalResultCount >= 10 ?
                        new Array(10).fill(0).map((plug, index) => {
                            let pageColor
                            let pageHeight
                            if (index+1 === page) {
                                pageColor = '#ffffff'
                                pageHeight = 'scale(1.25)'
                            }
                            else {
                                pageColor = '#000000'
                            }
                            return (
                                <div style={{transform: pageHeight}} key={index} onClick={() => {choosenPage(index+1)}} className={s.search_page_block}>
                                    <p style={{color: pageColor}} className={s.search_page}  >{index+1}</p>
                                </div>
                            )
                        })
                    : 
                        new Array(Math.Ceil(totalResultCount)).fill(0).map((plug, index) => {
                            return (
                                <div key={index} onClick={() => {choosenPage(index+1)}}>
                                    <p>{index+1}</p>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default SearchLine