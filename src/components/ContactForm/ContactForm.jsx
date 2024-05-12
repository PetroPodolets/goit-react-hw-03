import { Formik, Form, ErrorMessage, Field } from "formik";
import { nanoid } from "nanoid";
import { useId } from "react";
import * as Yup from "yup";
import css from './ContactForm.module.css'

const UserSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too Short!").max(50, "Too long!").required("Required"),
    number: Yup.string().max(13, "Too long!").required("Required")
})

const initialValues = {
    name: "",
    number: "",
}




export default function ContactForm({ onAdd }) {
    const nameId = useId();
    const numberId = useId();


    const handleSubmit = (values, actions) => {
        const specialId = nanoid();
        const newContact = { ...values, id: specialId };
        onAdd(newContact);
        actions.resetForm();
    }


    return (
        <>
            <Formik initialValues={initialValues}
                validationSchema={UserSchema}
                onSubmit={handleSubmit}
            >


                <Form className={css.form}>

                    <div className={css.container}>
                        <label htmlFor={nameId}>Name</label>
                        <Field className={css.input} type="text" name="name" id={nameId} />
                        <ErrorMessage className={css.error} name="name" component="span" />

                    </div>
                    <div className={css.container}>
                        <label htmlFor={numberId}>Number</label>
                        <Field className={css.input} type="" name="number" id={numberId} />
                        <ErrorMessage className={css.error} name="number" component="span" />
                    </div>
                    <button className={css.button} type="submit">Add Contact</button>
                </Form>
            </Formik >
        </>
    )
}
