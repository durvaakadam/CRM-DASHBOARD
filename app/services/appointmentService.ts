import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/appointments';

export const fetchAppointments = async () => {
const res = await axios.get(BASE_URL);
return res.data;
};

export const createAppointment = async (appointmentData: any) => {
const res = await axios.post(BASE_URL, appointmentData);
return res.data;
};

export const deleteAppointment = async (id: string) => {
const res = await axios.delete(${BASE_URL}/${id});
return res.data;
};

export const updateAppointment = async (id: string, updates: any) => {
const res = await axios.put(${BASE_URL}/${id}, updates);
return res.data;
};

