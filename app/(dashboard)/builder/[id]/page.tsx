import { GetFormByID } from '@/actions/form'
import FormBuilder from '@/components/FormBuilder'
import React from 'react'

async function BuilderPage({ params }: { params: { id: string } }) {
    const { id } = params
    const form = await GetFormByID(Number(id))
    if (!form) {
        throw new Error("form not found")
    }
    return (
        <FormBuilder form={form} />
    )
}

export default BuilderPage