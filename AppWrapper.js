import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import App from './App'

import { store } from './store/store'
const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

export default AppWrapper

const styles = StyleSheet.create({})