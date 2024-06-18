import React from 'react'
import { CardPartidoTitles, CardPartidoWrapper, CardPartidoTeams, CardPartidoTeam, CardPartidoInfo, CardPartidoStats, CardPartidoDivider } from './CardPartidoStyles'
import EscudoCelta from '/Escudos/celta-de-vino.png'
import EscudoPuraQuimica from '/Escudos/pura-quimica.png'
import { NavLink } from 'react-router-dom'


const CardPartido = ({finished, observer}) => {
    return (
        <CardPartidoWrapper> 
            <CardPartidoTitles>
                
                <h3>Serie A - Apertura 2024</h3>
                {finished ? (
                        <>
                            <p>Sabado 03/02 | Fecha 1 - Cancha 1</p>
                        </>
                    ) : (
                        <>
                            <p>Fecha 1 - Cancha 1</p>
                        </>
                    )}
            </CardPartidoTitles>
            <CardPartidoTeams>
                <CardPartidoTeam>
                    <img src={EscudoCelta} />
                    <h4>
                        Celta de Vino
                    </h4>
                </CardPartidoTeam>

                <CardPartidoInfo>
                    {finished ? (
                        <>
                            <h4>4-2</h4>
                            <span>Final</span>
                        </>
                    ) : (
                        <>
                            <h5>17:00</h5>
                            <p>Sábado 05/04</p>
                        </>
                    )}
                </CardPartidoInfo>

                <CardPartidoTeam>
                    <img src={EscudoPuraQuimica} />
                    <h4>
                        Pura Química
                    </h4>
                </CardPartidoTeam>
                
            </CardPartidoTeams>
            {
                finished ? (
                    <>
                        <CardPartidoDivider/>
                        <CardPartidoStats>
                            <NavLink to="/stats-match">
                                Ver estadísticas completas
                            </NavLink>
                        </CardPartidoStats>
                    </>
                ) : (
                    observer ? (
                        <>
                        <CardPartidoDivider/>
                        <CardPartidoStats>
                            <NavLink to="/planillero/planilla">
                                Ir a planillar partido
                            </NavLink>
                        </CardPartidoStats>
                    </>
                    ) : (
                        <>
                        </>
                    )
                )
            }

        </CardPartidoWrapper>
    )
}

export default CardPartido