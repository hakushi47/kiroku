import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBOk2WBU5aNabYU8iNNzKy1pRI_vKMj78",
  authDomain: "kiroku-30c48.firebaseapp.com",
  projectId: "kiroku-30c48",
  storageBucket: "kiroku-30c48.firebasestorage.app",
  messagingSenderId: "316945906139",
  appId: "1:316945906139:web:0f31e42f6e00b3d8aecffe",
  measurementId: "G-4H4DHMJ2FZ"
};

// Firebase初期化
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Google認証プロバイダー
const googleProvider = new GoogleAuthProvider();

// 認証関連の関数
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Googleログインエラー:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('ログアウトエラー:', error);
    throw error;
  }
};

// ユーザープロフィール関連の関数
export interface Course {
  id: string;
  name: string;
  duration: number; // 分単位
  price: number; // 円単位
}

export interface Back {
  id: string;
  name: string;
  duration: number; // 分単位
  price: number; // 円単位
}

export interface UserProfile {
  genjiName: string;
  storeName: string;
  courses: Course[];
  backs: Back[];
}

// カウンセリングシート関連の型定義
export type QuestionType = 'text' | 'textarea' | 'radio' | 'checkbox' | 'number';

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  required: boolean;
  options?: string[]; // ラジオボタン・チェックボックス用
  placeholder?: string;
  order: number;
}

export interface CounselingSheet {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export const saveUserProfile = async (userId: string, profile: UserProfile) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, profile, { merge: true });
  } catch (error) {
    console.error('プロフィール保存エラー:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('プロフィール取得エラー:', error);
    throw error;
  }
};

// カウンセリングシート関連の関数
export const saveCounselingSheet = async (userId: string, sheet: CounselingSheet) => {
  try {
    console.log('Firebase保存開始:', { userId, sheetId: sheet.id });
    
    const sheetRef = doc(db, 'sheets', sheet.id);
    const sheetData = {
      ...sheet,
      userId,
      updatedAt: new Date()
    };
    
    console.log('保存するデータ:', sheetData);
    
    await setDoc(sheetRef, sheetData, { merge: true });
    console.log('Firebase保存完了');
  } catch (error) {
    console.error('シート保存エラー詳細:', error);
    throw error;
  }
};

export const getCounselingSheets = async (userId: string): Promise<CounselingSheet[]> => {
  try {
    const { collection, query, where, orderBy, getDocs } = await import('firebase/firestore');
    const sheetsRef = collection(db, 'sheets');
    const q = query(
      sheetsRef,
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    })) as CounselingSheet[];
  } catch (error) {
    console.error('シート取得エラー:', error);
    throw error;
  }
};

export const deleteCounselingSheet = async (sheetId: string) => {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    const sheetRef = doc(db, 'sheets', sheetId);
    await deleteDoc(sheetRef);
  } catch (error) {
    console.error('シート削除エラー:', error);
    throw error;
  }
};

export { auth, db, onAuthStateChanged };
export type { User }; 