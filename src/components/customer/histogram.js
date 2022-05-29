import { LineChart, Line, YAxis, CartesianGrid } from 'recharts';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

const Histogram = () => {
    const data = [0, 0, 1, 2, 454, 3];

    // const quizUserRef = doc(db, 'quizUser', localStorage.getItem('email'));
    // const docSnap = getDoc(quizUserRef);

    // if (docSnap.exists()) {
    //     console.log('Document data:', docSnap.data());
    // } else {
    //     //   doc.data() will be undefined in this case
    //     console.log('No such document!');
    // }

    return (
        <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey={(v) => v} />
            <Line type="monotone" dataKey={(v) => v} stroke="#8884d8" />
        </LineChart>
    );
};

export default Histogram;
