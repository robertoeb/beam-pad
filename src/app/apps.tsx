import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, PenLine, LayoutGrid } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { AppGrid } from '@/components/AppGrid';
import { useLayoutStore } from '@/stores/layout';

export default function AppsScreen() {
  const params = useLocalSearchParams<{ edit?: string }>();
  const pinned = useLayoutStore((s) => s.pinned);
  const [edit, setEdit] = useState(params.edit === '1');

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-5 pt-4">
        <View className="mb-4 flex-row items-center justify-between">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            className="flex-row items-center"
          >
            <ArrowLeft size={20} color="#FFFFFF" />
            <Text className="ml-2 font-semibold text-base text-white">Apps</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={edit ? 'Done editing' : 'Edit apps'}
            onPress={() => setEdit((v) => !v)}
          >
            {edit ? (
              <Text className="font-semibold text-sm text-[#00E5FF]">Done</Text>
            ) : (
              <PenLine size={20} color="#A1A1AA" />
            )}
          </Pressable>
        </View>

        {pinned.length === 0 && !edit ? (
          <View className="flex-1 items-center justify-center">
            <LayoutGrid size={48} color="#52525B" />
            <Text className="mt-4 text-sm text-[#52525B]">Pin your favorite TV apps</Text>
          </View>
        ) : (
          <AppGrid edit={edit} />
        )}
      </View>
    </SafeAreaView>
  );
}
