import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-errors',
  standalone: true,
  imports: [],
  templateUrl: './input-errors.component.html',
  styleUrl: './input-errors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputErrorsComponent {
  @Input() errors: string[] | undefined | null = [];
}
