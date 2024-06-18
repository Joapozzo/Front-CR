import React, { useEffect } from 'react'
import { HomeWrapper } from '../../Home/HomeStyles'
import Section from '../../../components/Section/Section'
import { HomePlanilleroContainer } from './HomePlanilleroStyles'
import CardPartido from '../../../components/Stats/CardPartido/CardPartido'
import { useAuth } from '../../../Auth/AuthContext'
import toast, { Toaster } from 'react-hot-toast'

const HomePlanillero = () => {

    const { userName, showWelcomeToast, setShowWelcomeToast } = useAuth()
    useEffect(() => {
        if (userName && showWelcomeToast) {
            toast(`Bienvenid@, planillero ${userName}`, {
                icon: '👋',
                style: {
                    borderRadius: '10px',
                    background: 'var(--gray-500)',
                    color: 'var(--white)',
                },
                duration: 4000,
                position: "top-center"
            });
            setShowWelcomeToast(false);
        }
    },[userName, showWelcomeToast, setShowWelcomeToast]);

return (
    <HomePlanilleroContainer>
        <HomeWrapper>
            <Section>
                <h2>Mis Partidos</h2>
                <CardPartido observer/>
                <CardPartido observer/>
                <CardPartido observer/>
            </Section>
        </HomeWrapper>
        <Toaster/>
    </HomePlanilleroContainer>
)
}

export default HomePlanillero