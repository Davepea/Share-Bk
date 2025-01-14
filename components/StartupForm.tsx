"use client"

import { Input } from '@/components/ui/input'
import React, { useActionState, useState } from 'react'
import { Textarea } from '@/components/ui/textarea';
import MDEditor from '@uiw/react-md-editor'
import { Button } from '@/components/ui/button';
import { FiSend } from 'react-icons/fi';
import { formSchema } from '@/lib/validation';
import { z } from "zod"
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';


const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string,string>>({});
    const [pitch, setPitch] = useState("");
    const { toast } = useToast();
    const router = useRouter() 
    // const isPending = false

    const handleFormSubmit = async (prevState: any, formData: FormData)=>{
        try {
            const formValues ={
                title: formData.get('title') as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
                
            };

            await formSchema.parseAsync(formValues);


            const result = await createPitch( prevState, formData, pitch)

    

            if(result.status == 'SUCCESS'){
                toast({
                    title: 'Success',
                    description: 'Your idea has been submitted successfully',
                })
            router.push(`/startup/${result._id}`)

            }
            return result;
        } catch (error) {
            if ( error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;

                setErrors(fieldErrors as unknown as Record< string, string>);

                toast({
                    title: "Error",
                    description: "Please check the form fields",
                    variant: "destructive"
                })

                return { ...prevState, error: 'Validation Failed', status: "ERROR"}
            }

            toast({
                title: "Error",
                description: "An unexpected error has occurred",
                variant: "destructive"
            })


            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR",
            }
            
        } 

    };


    const [state, formAction, isPending] = useActionState(handleFormSubmit, { error: '', status: 'INITIAL'});

 
  return (
   <form action={formAction} className='startup-form'>
    <div>
        <label htmlFor="title" className='startup-form_label'>Title</label>
        <Input id='title' type='text' name='title' className='startup-form_input' required placeholder='Startup Title' />
        { errors.title && <p className='startup-form_error'>{errors.title}</p>}
    </div>
    <div>
        <label htmlFor="description" className='startup-form_label'>Description</label>
        <Textarea id='description' name='description' className='startup-form_textarea' required placeholder='Startup Description' />
        { errors.description && <p className='startup-form_error'>{errors.description}</p>}
    </div>
    <div>
        <label htmlFor="category" className='startup-form_label'>Category</label>
        <Input id='category' type='text' name='category' className='startup-form_input' required placeholder='Startup Category (Tech, Health, Education...)' />
        { errors.category && <p className='startup-form_error'>{errors.category}</p>}
    </div>
    <div>
        <label htmlFor="Link" className='startup-form_label'>Image URL</label>
        <Input id='link' type='text' name='link' className='startup-form_input' required placeholder='Startup Image URL' />
        { errors.link && <p className='startup-form_error'>{errors.link}</p>}
    </div>
    <div data-color-mode="light">
        <label htmlFor="Pitch" className='startup-form_label'>Pitch</label>
        <MDEditor
        value={pitch}
        onChange={(value)=> setPitch(value as string)}
        id='pitch'
        preview='edit'
        height={300}
        style={{borderRadius:20, overflow: "hidden"}}
        textareaProps={{
            placeholder: 'Breifly describe Your Idea and what Problem it solves'
        }}
      />
        
        { errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
    </div>
    <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit your pitch'}
        <FiSend/>
    </Button>
   </form>
  )
}

export default StartupForm