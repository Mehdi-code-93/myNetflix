import axios, { all } from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
// import { useEffect } from "react";
import "../css/app.css";
import { Link } from "react-router-dom";
import { } from '../'

export default function Members() {

    const [dataUser, setDataUser] = useState([]);
    const [getUsers, setUsers] = useState([]);

    const getMembersOfBetaSeries = () => {

        let ajouteGetAxios = [];
        let allUser = [];

        let strs = ['a', 'b', 'c'];

        for (let index = 0; index < strs.length; index++) {
            ajouteGetAxios.push(axios.get(`https://api.betaseries.com/members/search?login=%${strs[index]}`, {
                headers: {
                    Authorization: "Bearer 2cdb1c222eff",
                    "X-BetaSeries-Key": "4a594a99c9e2",
                }
            }))
        }

        axios.all(ajouteGetAxios).then(axios.spread((...allData) => {
            allData.forEach(allData => {
                allUser.push(allData.data.users);

                setUsers(allUser);

            })
        })
        )
    }

    useEffect(() => {
        getMembersOfBetaSeries();
    }, []);
    return (
        <>
            < Header />
            <div className="wrapper">
                { console.log(getUsers)}
                {getUsers.map((users, index) => {
                    return (
                        <main className="blok-container" key={index}>
                            { users.map((user, index) => {
                                return (
                                    <Link to={`friends/${user.id}`} key={index} className="container-friend">
                                        <div className="member-title">{user.login}</div>
                                        <div className="groupe-member-options">
                                            <div className="member-account">
                                                {
                                                    user.in_account === true 
                                                    ?
                                                    <img src={require("../asset/boutonVert.png")} className="btnAdd2" alt="icone vert" />
                                                    : 
                                                    <img src={require("../asset/boutonRouge.png")} className="btnAdd2" alt="icone rouge" />
                                                    
                                                }
                                                </div>
                                            <div className="member-container-xp">
                                                <div className="xp_title">{user.xp}</div>
                                                <img src={require('../asset/xp.png')} alt="xp" className="btnAdd2" />
                                            </div>
                                        </div>
                                        {/* <button className="button_ajout">Ajouter en ami</button> */}
                                    </Link>
                                )
                            }) }
                        </main>
                    )}
                )}
            </div>
        </>
    )
}
// useEffect(() => {
//     getMembersOfBetaSeries()
// }, []);
