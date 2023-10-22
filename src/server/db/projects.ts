import type { Project } from '../../utils/types/projects.types';

const projects: Project[] = [
  {
    slug: 'test',
    name: 'Your Awesome Project test 2',
    shortDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed lorem urna. Nullam sed urna lorem.',
    blocks: [
      {
        title: 'My super section to introduce the project',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed lorem urna. Nullam sed urna lorem. Nunc hendrerit tellus lorem. Etiam urna augue, vehicula quis libero eget, congue volutpat turpis. Maecenas imperdiet risus id est tincidunt, non tempor ex vestibulum. Morbi et massa in ipsum cursus porttitor. Proin ullamcorper sapien non velit placerat, sit amet consequat nisi euismod.',
        image: 'https://picsum.photos/200/200',
        imagePosition: 'left'
      },
      {
        title: 'This is the section 2',
        content:
          'Mauris vel rutrum diam, ac accumsan lacus. Nulla fermentum elit eu lectus tincidunt vestibulum. Fusce lobortis turpis sed lobortis blandit. Praesent eu sollicitudin urna. Ut bibendum elementum dignissim. Integer eros lorem, consequat non tincidunt et, cursus sed neque. Integer faucibus lorem sed ligula consequat elementum. Sed nunc nunc, dictum a pharetra vel, semper eu nibh. Duis pretium feugiat ante, aliquet ultricies erat imperdiet sed.',
        image: 'https://picsum.photos/200/200',
        imagePosition: 'right'
      },
      {
        title: 'No image but still a cool section',
        content:
          'Mauris molestie bibendum velit, quis laoreet purus. Phasellus vitae sem vel neque lobortis rhoncus in a nunc. Curabitur dictum convallis risus, ac ornare dui feugiat at. Duis mauris dui, tempor quis massa aliquet, cursus venenatis dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec eu erat in sem suscipit molestie. Duis pulvinar nulla quis eros sagittis rhoncus. Nulla facilisi. In et sapien euismod, blandit ex ut, rhoncus nisl. Duis ornare odio ac nisi tincidunt volutpat ut bibendum ipsum. Integer eu lectus enim. Donec pellentesque sollicitudin turpis, quis porttitor eros rutrum sed.'
      },
      {
        content:
          'Nulla vel lacinia dolor. Duis volutpat dapibus eleifend. Sed ac auctor nibh. Pellentesque nulla mauris, varius ac ultrices ac, cursus nec lacus. Cras nec magna et massa congue hendrerit. Aliquam molestie arcu nunc, vel lacinia nisl viverra id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam pretium, tellus ut lobortis varius, metus risus ultrices eros, non laoreet ex mi quis metus.',
        image: 'https://picsum.photos/200/200',
        imagePosition: 'left'
      },
      {
        content:
          'Ut efficitur molestie ligula, id aliquam magna. Aenean fringilla fermentum ipsum sagittis gravida. Sed pulvinar felis a suscipit pharetra. Suspendisse sapien augue, vehicula sed orci ac, posuere convallis lacus. Duis laoreet congue eros nec maximus. Aliquam hendrerit orci at porttitor elementum. Suspendisse sollicitudin feugiat justo, a dictum risus vulputate ut. Suspendisse egestas efficitur urna id posuere. Aenean elementum vel risus non semper. Sed eget quam magna.',
        image: 'https://picsum.photos/200/200',
        imagePosition: 'right'
      }
    ],
    technologiesUsed: ['vuejs', 'php']
  }
];

export default projects;
