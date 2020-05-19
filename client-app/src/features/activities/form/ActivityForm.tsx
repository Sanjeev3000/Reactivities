import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null;
  createActivity: (actvity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
}) => {
  const initializeForm = () => {
    if (initialFormState) return initialFormState;
    else
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: "",
      };
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity);
    } else editActivity(activity);
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setActivity({
      ...activity,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  return (
    <Segment clearing>
      <Form>
        <Form.Input
          name="title"
          placeholder="Title"
          onChange={(e) => handleInputChange(e)}
          value={activity.title}
        />
        <Form.TextArea
          name="description"
          rows="2"
          onChange={(e) => handleInputChange(e)}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          name="category"
          onChange={(e) => handleInputChange(e)}
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          name="date"
          onChange={(e) => handleInputChange(e)}
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          name="city"
          placeholder="City"
          value={activity.city}
          onChange={(e) => handleInputChange(e)}
        />
        <Form.Input
          name="venue"
          placeholder="Venue"
          value={activity.venue}
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          onClick={() => handleSubmit()}
        />
        <Button
          floated="right"
          content="Cancel"
          type="button"
          onClick={() => setEditMode(false)}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
