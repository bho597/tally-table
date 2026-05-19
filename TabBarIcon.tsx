import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  size?: number;
};

export function TabBarIcon({ name, color, size = 24 }: Props) {
  return <Ionicons name={name} size={size} color={color} />;
}
