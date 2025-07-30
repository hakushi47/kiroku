'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { saveUserProfile, getUserProfile, UserProfile, Course, Back } from '@/lib/firebase';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [profile, setProfile] = useState<UserProfile>({
    genjiName: '',
    storeName: '',
    courses: [],
    backs: []
  });

  // 認証状態チェック
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // プロフィールデータ取得
  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      const userProfile = await getUserProfile(user.uid);
      if (userProfile) {
        setProfile(userProfile);
      }
    } catch (error) {
      console.error('プロフィール取得エラー:', error);
      setError('プロフィールの取得に失敗しました。');
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name: '',
      duration: 0,
      price: 0
    };
    setProfile(prev => ({
      ...prev,
      courses: [...prev.courses, newCourse]
    }));
  };

  const removeCourse = (id: string) => {
    setProfile(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course.id !== id)
    }));
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setProfile(prev => ({
      ...prev,
      courses: prev.courses.map(course =>
        course.id === id ? { ...course, [field]: value } : course
      )
    }));
  };

  const addBack = () => {
    const newBack: Back = {
      id: Date.now().toString(),
      name: '',
      duration: 0,
      price: 0
    };
    setProfile(prev => ({
      ...prev,
      backs: [...prev.backs, newBack]
    }));
  };

  const removeBack = (id: string) => {
    setProfile(prev => ({
      ...prev,
      backs: prev.backs.filter(back => back.id !== id)
    }));
  };

  const updateBack = (id: string, field: keyof Back, value: string | number) => {
    setProfile(prev => ({
      ...prev,
      backs: prev.backs.map(back =>
        back.id === id ? { ...back, [field]: value } : back
      )
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    setMessage('');
    setError('');
    
    try {
      await saveUserProfile(user.uid, profile);
      setMessage('プロフィールが保存されました！');
    } catch (error) {
      console.error('保存エラー:', error);
      setError('プロフィールの保存に失敗しました。');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7CA98B]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">プロフィール編集</h1>
            <Button
              onClick={() => router.push('/')}
              variant="secondary"
            >
              ホームに戻る
            </Button>
          </div>

          {message && (
            <div className="mb-4 bg-[#7CA98B] text-white px-4 py-3 rounded-lg">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 bg-[#FFB6B6] text-white px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            {/* 基本情報 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">基本情報</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="源氏名"
                  placeholder="源氏名を入力してください"
                  value={profile.genjiName}
                  onChange={(e) => handleInputChange('genjiName', e.target.value)}
                  required
                />
                <Input
                  label="店舗名"
                  placeholder="店舗名を入力してください"
                  value={profile.storeName}
                  onChange={(e) => handleInputChange('storeName', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* コース情報 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">コース情報</h2>
                <Button
                  type="button"
                  onClick={addCourse}
                  variant="secondary"
                >
                  コースを追加
                </Button>
              </div>
              
              {profile.courses.length === 0 ? (
                <p className="text-gray-500 text-center py-4">コースが登録されていません</p>
              ) : (
                <div className="space-y-4">
                  {profile.courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Input
                          label="コース名"
                          placeholder="コース名を入力"
                          value={course.name}
                          onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                          required
                        />
                        <Input
                          label="時間（分）"
                          type="number"
                          placeholder="60"
                          value={course.duration}
                          onChange={(e) => updateCourse(course.id, 'duration', parseInt(e.target.value) || 0)}
                          required
                        />
                        <Input
                          label="料金（円）"
                          type="number"
                          placeholder="10000"
                          value={course.price}
                          onChange={(e) => updateCourse(course.id, 'price', parseInt(e.target.value) || 0)}
                          required
                        />
                        <div className="flex items-end">
                          <Button
                            type="button"
                            onClick={() => removeCourse(course.id)}
                            variant="danger"
                            className="w-full"
                          >
                            削除
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* バック情報 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">バック情報</h2>
                <Button
                  type="button"
                  onClick={addBack}
                  variant="secondary"
                >
                  バックを追加
                </Button>
              </div>
              
              {profile.backs.length === 0 ? (
                <p className="text-gray-500 text-center py-4">バックが登録されていません</p>
              ) : (
                <div className="space-y-4">
                  {profile.backs.map((back) => (
                    <div key={back.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Input
                          label="バック名"
                          placeholder="バック名を入力"
                          value={back.name}
                          onChange={(e) => updateBack(back.id, 'name', e.target.value)}
                          required
                        />
                        <Input
                          label="時間（分）"
                          type="number"
                          placeholder="30"
                          value={back.duration}
                          onChange={(e) => updateBack(back.id, 'duration', parseInt(e.target.value) || 0)}
                          required
                        />
                        <Input
                          label="料金（円）"
                          type="number"
                          placeholder="5000"
                          value={back.price}
                          onChange={(e) => updateBack(back.id, 'price', parseInt(e.target.value) || 0)}
                          required
                        />
                        <div className="flex items-end">
                          <Button
                            type="button"
                            onClick={() => removeBack(back.id)}
                            variant="danger"
                            className="w-full"
                          >
                            削除
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 保存ボタン */}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={saving}
                className="px-8 py-3 text-lg"
              >
                {saving ? '保存中...' : 'プロフィールを保存'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 