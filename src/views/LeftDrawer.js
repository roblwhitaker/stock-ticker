import {Typography} from '@material-ui/core'
import React from 'react'
import LeftSearch from '../components/search/LeftSearch'
import PopularCard from '../components/popular/PopularCard'

function LeftDrawer() {
    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}>
                <Typography variant='h2'  
                style={{marginBottom: '20px', fontWeight: '700', textAlign: 'center'}}>
                    Stocksss
                </Typography>
            </div> 
                <LeftSearch/>
            <div style={{marginTop: '20px'}}>
                <PopularCard />
            </div>
        </div>
    )
}

export default LeftDrawer
