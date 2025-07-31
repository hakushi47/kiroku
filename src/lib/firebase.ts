import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

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

// メール/パスワード認証
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('メールサインアップエラー:', error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('メールログインエラー:', error);
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
  options?: string[] | null; // ラジオボタン・チェックボックス用
  placeholder?: string | null;
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

// 回答関連の型定義
export interface Answer {
  questionId: string;
  value: string | string[] | number;
}

export interface SheetResponse {
  id: string;
  sheetId: string;
  answers: Answer[];
  submittedAt: Date;
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
    
    // undefinedの値を除去してFirestoreに保存
    const cleanSheet = {
      id: sheet.id,
      title: sheet.title,
      description: sheet.description || null,
      questions: sheet.questions.map(q => ({
        id: q.id,
        type: q.type,
        title: q.title,
        required: q.required,
        order: q.order,
        placeholder: q.placeholder || null,
        options: q.options || null
      })),
      createdAt: sheet.createdAt,
      updatedAt: new Date()
    };
    
    const sheetData = {
      ...cleanSheet,
      userId
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
    const { collection, query, where, getDocs } = await import('firebase/firestore');
    const sheetsRef = collection(db, 'sheets');
    const q = query(
      sheetsRef,
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    
    const sheets = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate()
    })) as CounselingSheet[];
    
    // クライアント側でソート
    return sheets.sort((a, b) => {
      if (!a.updatedAt || !b.updatedAt) return 0;
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    });
  } catch (error) {
    console.error('シート取得エラー:', error);
    throw error;
  }
};

export const getCounselingSheet = async (sheetId: string): Promise<CounselingSheet | null> => {
  try {
    const sheetRef = doc(db, 'sheets', sheetId);
    const sheetSnap = await getDoc(sheetRef);
    
    if (sheetSnap.exists()) {
      return {
        ...sheetSnap.data(),
        id: sheetSnap.id,
        createdAt: sheetSnap.data().createdAt?.toDate(),
        updatedAt: sheetSnap.data().updatedAt?.toDate()
      } as CounselingSheet;
    }
    return null;
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

// 回答関連の関数
export const submitSheetResponse = async (response: SheetResponse) => {
  try {
    console.log('回答送信開始:', response);
    
    const { collection, addDoc } = await import('firebase/firestore');
    const responsesRef = collection(db, 'responses');
    
    // response.idを除外して、Firestoreが自動的にIDを生成するようにする
    const { id, ...responseData } = response;
    
    // Firestoreに保存
    const cleanResponseData = {
      ...responseData,
      submittedAt: new Date()
    };
    
    console.log('送信するデータ:', cleanResponseData);
    
    const docRef = await addDoc(responsesRef, cleanResponseData);
    
    console.log('回答送信完了:', docRef.id);
  } catch (error) {
    console.error('回答送信エラー詳細:', error);
    throw error;
  }
};

export const getSheetResponses = async (sheetId: string): Promise<SheetResponse[]> => {
  try {
    const { collection, query, where, getDocs } = await import('firebase/firestore');
    const responsesRef = collection(db, 'responses');
    const q = query(
      responsesRef,
      where('sheetId', '==', sheetId)
    );
    const querySnapshot = await getDocs(q);
    
    const responses = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      submittedAt: doc.data().submittedAt?.toDate()
    })) as SheetResponse[];
    
    // クライアント側でソート
    return responses.sort((a, b) => {
      if (!a.submittedAt || !b.submittedAt) return 0;
      return b.submittedAt.getTime() - a.submittedAt.getTime();
    });
  } catch (error) {
    console.error('回答取得エラー:', error);
    throw error;
  }
};

export { auth, db, onAuthStateChanged };
export type { User }; 