import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseSuperPower, chooseComics, chooseDescription } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

import { useGetData } from '../../custom-hooks';

interface CharacterFormProps {
    id?: string;
    data?: {}
}

interface CharacterState {
    name: string;
    price: string;
}

export const CharacterForm = (props: CharacterFormProps) => {

    const dispatch = useDispatch();
    let { characterData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<CharacterState>(state => state.name)
    const { register, handleSubmit } = useForm({})

    const onSubmit = (data: any, event: any) => {
        console.log(props.id)

        if (props.id!) { //if id is not null (it exists) - update
            server_calls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            event.target.reset();
        } else { //if null
            dispatch(chooseName(data.name)) // create a new one.
            dispatch(chooseSuperPower(data.super_power))
            dispatch(chooseComics(data.comics_appeared_in))
            dispatch(chooseDescription(data.description))
            server_calls.create(store.getState())
            console.log(`There is a New Character`)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Character Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="super_power">Super Power</label>
                    <Input {...register('super_power')} name="super_power" placeholder="Super Power" />
                </div>
                <div>
                    <label htmlFor="comics_appeared_in"># of Comic Appearances</label>
                    <Input {...register('comics_appeared_in')} name="comics_appeared_in" placeholder="# of Comic Appearances" />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description" />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}